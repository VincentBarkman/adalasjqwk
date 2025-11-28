import { db } from '$lib/server/db';
import { leaderboard, userProgress, user } from '$lib/server/db/schema';
import { eq, sql, and } from 'drizzle-orm';
export async function updateLeaderboard(userId: string) {
	try {
		const completed = await db
			.select({ count: sql<number>`count(*)::int` })
			.from(userProgress)
			.where(and(eq(userProgress.userId, userId), eq(userProgress.completed, true)));
		const completedCount = Number(completed[0]?.count || 0);
		const times = await db
			.select({
				first: sql<Date>`MIN(${userProgress.completedAt})`,
				last: sql<Date>`MAX(${userProgress.completedAt})`
			})
			.from(userProgress)
			.where(and(eq(userProgress.userId, userId), eq(userProgress.completed, true)));
		const firstTime = times[0]?.first;
		const lastTime = times[0]?.last;
		let totalTime = null;
		if (firstTime && lastTime) {
			totalTime = Math.floor((new Date(lastTime).getTime() - new Date(firstTime).getTime()) / 1000);
		}
		const userInfo = await db
			.select({ name: user.name })
			.from(user)
			.where(eq(user.id, userId))
			.limit(1);
		const userName = userInfo[0]?.name || 'Anonymous';
		const existing = await db
			.select()
			.from(leaderboard)
			.where(eq(leaderboard.userId, userId))
			.limit(1);
		if (existing.length > 0) {
			await db
				.update(leaderboard)
				.set({
					userName,
					completedLevels: completedCount,
					totalTime,
					lastCompletedAt: lastTime ? new Date(lastTime) : null,
					updatedAt: new Date()
				})
				.where(eq(leaderboard.userId, userId));
		} else {
			await db.insert(leaderboard).values({
				userId,
				userName,
				completedLevels: completedCount,
				totalTime,
				lastCompletedAt: lastTime ? new Date(lastTime) : null
			});
		}
		return { success: true };
	} catch (error) {
		console.error('Error updating leaderboard:', error);
		return { success: false, error };
	}
}
