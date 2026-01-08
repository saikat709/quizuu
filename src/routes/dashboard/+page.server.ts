import { db } from '$lib/server/db';
import { note, quiz } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, '/auth');
    }

    const userId = locals.user.id; // Corrected: user.id is string from our schema

    // Fetch notes and quizzes for the user
    // We want to group them by video if possible, but our schema is decoupled.
    // However, if we assume they are created from a YT URL, we can group by that.

    // Fetch all notes
    const notes = await db.select().from(note).where(eq(note.userId, userId)).orderBy(desc(note.createdAt));

    // Fetch all quizzes
    const quizzes = await db.select().from(quiz).where(eq(quiz.userId, userId)).orderBy(desc(quiz.createdAt));

    // Group items by YouTube URL
    // Create a map of youtubeUrl -> { items: [], lastUpdated: date }

    type DashboardItem = {
        type: 'note' | 'quiz';
        id: string;
        title: string;
        createdAt: Date;
        ytUrl?: string;
    };

    const groups: Record<string, {
        ytUrl: string;
        title: string; // derived from first item
        items: DashboardItem[];
        lastUpdated: Date;
    }> = {};

    // Helper to extract video ID for thumbnail
    const getThumbnail = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg` : null;
    };

    // Add notes to groups
    for (const n of notes) {
        const url = n.yt_url;
        if (!groups[url]) {
            groups[url] = {
                ytUrl: url,
                title: n.title,
                items: [],
                lastUpdated: n.createdAt
            };
        }
        groups[url].items.push({ type: 'note', id: n.id, title: n.title, createdAt: n.createdAt, ytUrl: url });
        if (n.createdAt > groups[url].lastUpdated) groups[url].lastUpdated = n.createdAt;
    }

    // Add quizzes to groups
    for (const q of quizzes) {
        const url = q.yt_url || 'unknown'; // Quizzes might not have yt_url if created manually or old schema?
        if (url === 'unknown') continue; // Skip or handle separately? For now group by URL.

        if (!groups[url]) {
            groups[url] = {
                ytUrl: url,
                title: q.title,
                items: [],
                lastUpdated: q.createdAt
            };
        }
        groups[url].items.push({ type: 'quiz', id: q.id, title: q.title, createdAt: q.createdAt, ytUrl: url });
        if (q.createdAt > groups[url].lastUpdated) groups[url].lastUpdated = q.createdAt;
    }

    return {
        dashboardItems: Object.values(groups).sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
    };
};

export const actions: Actions = {
    transcribe: async ({ request }) => {
        const formData = await request.formData();
        const url = formData.get('url');

        if (!url || typeof url !== 'string') {
            return { success: false, message: 'Invalid URL' };
        }

        // Mock Transcription for now as per plan
        // In real app, call Python/FFmpeg service or API

        // Simulating delay
        await new Promise(r => setTimeout(r, 2000));

        return {
            success: true,
            transcription: "This is a simulated transcription of the video. It discusses the importance of AI in modern education...",
            url
        };
    },

    createQuiz: async ({ request, locals }) => {
        if (!locals.user) throw redirect(302, '/auth');

        const formData = await request.formData();
        const url = formData.get('url') as string;
        const textContent = formData.get('text') as string;

        // Create a Mock Quiz
        const quizId = crypto.randomUUID();
        await db.insert(quiz).values({
            id: quizId,
            userId: locals.user.id,
            title: `Quiz from ${url}`, // simple title
            yt_url: url,
            level: 'beginner', // default level for now
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Add Questions? (Skipping detail implementation for brevity, just entity creation)

        return { success: true, message: 'Quiz generated!' };
    },

    createNote: async ({ request, locals }) => {
        if (!locals.user) throw redirect(302, '/auth');

        const formData = await request.formData();
        const url = formData.get('url') as string;
        const textContent = formData.get('text') as string;

        const noteId = crypto.randomUUID();
        await db.insert(note).values({
            id: noteId,
            userId: locals.user.id,
            title: `Notes from ${url}`,
            content: "Generated notes based on transcription...", // simplified
            yt_url: url,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return { success: true, message: 'Note generated!' };
    }
};
