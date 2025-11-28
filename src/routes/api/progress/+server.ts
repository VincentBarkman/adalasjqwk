import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { userProgress } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '$lib/server/auth';
import { updateLeaderboard } from '$lib/server/leaderboard';
export const GET: RequestHandler = async (event) => {
	const session = await auth.api.getSession({ headers: event.request.headers });
	if (!session?.user?.id) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	try {
		const progress = await db
			.select()
			.from(userProgress)
			.where(eq(userProgress.userId, session.user.id));
		return json({ progress });
	} catch (error) {
		console.error('Error fetching progress:', error);
		return json({ error: 'Failed to fetch progress' }, { status: 500 });
	}
};
export const POST: RequestHandler = async (event) => {
	const session = await auth.api.getSession({ headers: event.request.headers });
	if (!session?.user?.id) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	try {
		const { level, completed } = await event.request.json();
		const existing = await db
			.select()
			.from(userProgress)
			.where(and(eq(userProgress.userId, session.user.id), eq(userProgress.level, level)))
			.limit(1);
		if (existing.length > 0) {
			await db
				.update(userProgress)
				.set({
					completed,
					completedAt: completed ? new Date() : null,
					updatedAt: new Date()
				})
				.where(and(eq(userProgress.userId, session.user.id), eq(userProgress.level, level)));
		} else {
			await db.insert(userProgress).values({
				userId: session.user.id,
				level,
				completed,
				completedAt: completed ? new Date() : null
			});
		}
		if (completed) {
			await updateLeaderboard(session.user.id);
		}
		return json({ success: true });
	} catch (error) {
		console.error('Error saving progress:', error);
		return json({ error: 'Failed to save progress' }, { status: 500 });
	}
};
