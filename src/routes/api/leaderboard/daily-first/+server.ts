import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { userProgress, user } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
export const GET: RequestHandler = async () => {
	try {
		const results = await db
			.select({
				level: userProgress.level,
				userId: userProgress.userId,
				userName: user.name,
				completedAt: userProgress.completedAt,
				dayCompleted: sql<string>`DATE(${userProgress.completedAt})`
			})
			.from(userProgress)
			.innerJoin(user, eq(userProgress.userId, user.id))
			.where(eq(userProgress.completed, true))
			.orderBy(userProgress.level, userProgress.completedAt);
		const firstCompletions: any[] = [];
		const seenLevelDays = new Set<string>();
		for (const result of results) {
			const key = `${result.level}-${result.dayCompleted}`;
			if (!seenLevelDays.has(key)) {
				seenLevelDays.add(key);
				firstCompletions.push({
					level: result.level,
					userName: result.userName,
					completedAt: result.completedAt
				});
			}
		}
		return json(firstCompletions);
	} catch (error) {
		console.error('Error fetching daily first leaderboard:', error);
		return json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
	}
};
