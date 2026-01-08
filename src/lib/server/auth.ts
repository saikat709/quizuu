import { db } from './db';
import { user, session } from './db/schema';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';

// Constants
const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	return encodeBase32LowerCaseNoPadding(bytes);
}

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const sessionData = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(session).values(sessionData);
	return sessionData;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: user, session: session })
		.from(session)
		.innerJoin(user, eq(session.userId, user.id))
		.where(eq(session.id, sessionId));

	if (result.length < 1) {
		return { session: null, user: null };
	}

	const { user: foundUser, session: foundSession } = result[0];

	if (Date.now() >= foundSession.expiresAt.getTime()) {
		await db.delete(session).where(eq(session.id, foundSession.id));
		return { session: null, user: null };
	}

	if (Date.now() >= foundSession.expiresAt.getTime() - DAY_IN_MS * 15) {
		foundSession.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(session)
			.set({ expiresAt: foundSession.expiresAt })
			.where(eq(session.id, foundSession.id));
	}

	return { session: foundSession, user: foundUser };
}
