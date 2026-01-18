import { db } from '$lib/server/db';
import { note, quiz, question, playlist, playlistClass } from '$lib/server/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { transcribeYoutube, generateContentWithLangChain } from '$lib/ai/services';
import { getVideoTitle } from '$lib/ai/youtube';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, '/auth');
    }

    const userId = locals.user.id;

    // Fetch all notes, quizzes, and playlists for the user
    const [userNotes, userQuizzes, userPlaylists] = await Promise.all([
        db.select().from(note).where(eq(note.userId, userId)).orderBy(desc(note.createdAt)),
        db.select().from(quiz).where(eq(quiz.userId, userId)).orderBy(desc(quiz.createdAt)),
        db.select().from(playlist).where(eq(playlist.userId, userId)).orderBy(desc(playlist.createdAt))
    ]);

    // Grouping logic for "Classes" (grouped by YouTube URL)
    const classMap: Record<string, {
        ytUrl: string;
        title: string;
        lastUpdated: Date;
        hasNote: boolean;
        hasQuiz: boolean;
        noteId?: string;
        quizId?: string;
    }> = {};

    const isGeneric = (t: string) => {
        if (!t) return true;
        const low = t.toLowerCase();
        return low.includes('notes from') ||
            low.includes('quiz from') ||
            low.includes('http') ||
            low.includes('untitled lecture') ||
            low === 'ai notes' ||
            low === 'ai quiz' ||
            t.length < 3;
    };

    // Process Notes
    for (const n of userNotes) {
        const url = n.yt_url || 'unknown';
        if (!classMap[url]) {
            classMap[url] = {
                ytUrl: url,
                title: n.title,
                lastUpdated: n.createdAt,
                hasNote: false,
                hasQuiz: false
            };
        }
        if (isGeneric(classMap[url].title) && !isGeneric(n.title)) {
            classMap[url].title = n.title;
        }
        classMap[url].hasNote = true;
        classMap[url].noteId = n.id;
        if (n.createdAt > classMap[url].lastUpdated) classMap[url].lastUpdated = n.createdAt;
    }

    // Process Quizzes
    for (const q of userQuizzes) {
        const url = q.yt_url || 'unknown';
        if (!classMap[url]) {
            classMap[url] = {
                ytUrl: url,
                title: q.title,
                lastUpdated: q.createdAt,
                hasNote: false,
                hasQuiz: false
            };
        }
        if (isGeneric(classMap[url].title) && !isGeneric(q.title)) {
            classMap[url].title = q.title;
        }
        classMap[url].hasQuiz = true;
        classMap[url].quizId = q.id;
        if (q.createdAt > classMap[url].lastUpdated) classMap[url].lastUpdated = q.createdAt;
    }

    // FINAL POLISH: If a class still has a generic title, fetch the REAL one from YouTube
    const classes = Object.values(classMap);
    await Promise.all(classes.map(async (c) => {
        if (isGeneric(c.title) && c.ytUrl !== 'unknown') {
            try {
                const realTitle = await getVideoTitle(c.ytUrl);
                if (realTitle && realTitle !== 'Untitled Lecture') {
                    c.title = realTitle;
                }
            } catch (e) {
                console.warn(`Could not fetch title for ${c.ytUrl}`);
            }
        }
    }));

    // Fetch Playlist contents
    const playlistsWithClasses = await Promise.all(userPlaylists.map(async (p) => {
        const pClasses = await db.select().from(playlistClass).where(eq(playlistClass.playlistId, p.id));
        return {
            ...p,
            classes: pClasses.map(pc => ({
                ytUrl: pc.ytUrl,
                // Try to find title in classMap, else just url
                title: classMap[pc.ytUrl]?.title || pc.ytUrl
            }))
        };
    }));

    return {
        classes: classes.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime()),
        playlists: playlistsWithClasses
    };
};

export const actions: Actions = {
    transcribe: async ({ request }) => {
        const formData = await request.formData();
        const url = formData.get('url');

        if (!url || typeof url !== 'string') {
            return { success: false, message: 'Invalid URL' };
        }

        try {
            const [transcription, title] = await Promise.all([
                transcribeYoutube(url),
                getVideoTitle(url)
            ]);

            return {
                success: true,
                transcription,
                title,
                url
            };
        } catch (e) {
            console.error('Transcription error:', e);
            return { success: false, message: 'Transcription service unavailable. Please try again later.' };
        }
    },

    createQuiz: async ({ request, locals }) => {
        if (!locals.user) throw redirect(302, '/auth');

        const formData = await request.formData();
        const url = formData.get('url') as string;
        const textContent = formData.get('text') as string;
        const videoTitle = formData.get('title') as string;

        try {
            const aiResponse = await generateContentWithLangChain(textContent, 'quiz');
            const jsonStr = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
            const quizData = JSON.parse(jsonStr);

            const quizId = crypto.randomUUID();
            await db.insert(quiz).values({
                id: quizId,
                userId: locals.user.id,
                title: videoTitle || quizData.title || `AI Quiz`,
                yt_url: url,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            for (const q of quizData.questions) {
                await db.insert(question).values({
                    id: crypto.randomUUID(),
                    quizId: quizId,
                    question: q.question,
                    options: JSON.stringify(q.options),
                    answer_inx: q.answer_inx,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            return { success: true };
        } catch (e) {
            console.error('Quiz error:', e);
            return { success: false };
        }
    },

    createNote: async ({ request, locals }) => {
        if (!locals.user) throw redirect(302, '/auth');

        const formData = await request.formData();
        const url = formData.get('url') as string;
        const textContent = formData.get('text') as string;
        const videoTitle = formData.get('title') as string;

        try {
            const aiNotes = await generateContentWithLangChain(textContent, 'note');

            const noteId = crypto.randomUUID();
            await db.insert(note).values({
                id: noteId,
                userId: locals.user.id,
                title: videoTitle || `AI Notes`,
                content: aiNotes,
                yt_url: url,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            return { success: true };
        } catch (e) {
            console.error('Note error:', e);
            return { success: false };
        }
    },

    createPlaylist: async ({ request, locals }) => {
        if (!locals.user) throw redirect(302, '/auth');
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        try {
            await db.insert(playlist).values({
                id: crypto.randomUUID(),
                userId: locals.user.id,
                title,
                description,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return { success: true };
        } catch (e) {
            return { success: false, message: 'Failed to create playlist.' };
        }
    },

    addToPlaylist: async ({ request, locals }) => {
        if (!locals.user) throw redirect(302, '/auth');
        const formData = await request.formData();
        const playlistId = formData.get('playlistId') as string;
        const ytUrl = formData.get('ytUrl') as string;

        try {
            await db.insert(playlistClass).values({
                playlistId,
                ytUrl,
                createdAt: new Date()
            });
            return { success: true };
        } catch (e) {
            return { success: false, message: 'Failed to add class to playlist.' };
        }
    },

    removeFromPlaylist: async ({ request, locals }) => {
        if (!locals.user) throw redirect(302, '/auth');
        const formData = await request.formData();
        const playlistId = formData.get('playlistId') as string;
        const ytUrl = formData.get('ytUrl') as string;

        try {
            await db.delete(playlistClass).where(
                and(
                    eq(playlistClass.playlistId, playlistId),
                    eq(playlistClass.ytUrl, ytUrl)
                )
            );
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    }
};
