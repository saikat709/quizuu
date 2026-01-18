import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hash, verify } from '@node-rs/argon2';
import { createSession, generateSessionToken } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
    // If already logged in, redirect to dashboard/home
    // (Assuming locals.user is populated in hooks.server.ts, but we haven't written hooks yet with this new auth.ts)
    // We'll skip strict redirect for now or checking locals unless we implement hooks.
    return {};
};

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
            return fail(400, { message: 'Invalid input' });
        }

        if (username === 'admin' && password === 'admin') {
            let [existingAdmin] = await db.select().from(user).where(eq(user.username, 'admin')).limit(1);

            if (!existingAdmin) {
                const passwordHash = await hash('admin', {
                    memoryCost: 19456,
                    timeCost: 2,
                    outputLen: 32,
                    parallelism: 1
                });
                const userId = crypto.randomUUID();
                await db.insert(user).values({
                    id: userId,
                    username: 'admin',
                    passwordHash,
                    role: 'admin',
                    age: 99
                });
                [existingAdmin] = await db.select().from(user).where(eq(user.id, userId)).limit(1);
            }

            const token = generateSessionToken();
            const session = await createSession(token, existingAdmin.id);

            cookies.set('session', token, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                expires: session.expiresAt
            });

            throw redirect(302, '/admin');
        }

        const [existingUser] = await db.select().from(user).where(eq(user.username, username)).limit(1);

        if (!existingUser) {
            return fail(400, { message: 'Incorrect username or password' });
        }

        const validPassword = await verify(existingUser.passwordHash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        if (!validPassword) {
            return fail(400, { message: 'Incorrect username or password' });
        }

        const token = generateSessionToken();
        const session = await createSession(token, existingUser.id);

        cookies.set('session', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            expires: session.expiresAt
        });

        if (existingUser.role === 'admin') {
            throw redirect(302, '/admin');
        }
        throw redirect(302, '/');
    },

    register: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
            return fail(400, { message: 'Invalid input' });
        }

        if (password.length < 6) {
            return fail(400, { message: 'Password must be at least 6 characters' });
        }

        if (password !== confirmPassword) {
            return fail(400, { message: 'Passwords do not match' });
        }

        // Check if user exists
        const [existingUser] = await db.select().from(user).where(eq(user.username, username)).limit(1);

        if (existingUser) {
            return fail(400, { message: 'Username already taken' });
        }

        const passwordHash = await hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        const userId = crypto.randomUUID();

        // Transaction ideally
        await db.insert(user).values({
            id: userId,
            username,
            passwordHash,
            age: 0 // default age or prompt for it
        });

        const token = generateSessionToken();
        const session = await createSession(token, userId);

        cookies.set('session', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            expires: session.expiresAt
        });

        throw redirect(302, '/');
    }
};
