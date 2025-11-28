import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { leaderboard } from '$lib/server/db/schema';
import { desc, sql } from 'drizzle-orm';
import { auth } from '$lib/server/auth';
import { updateLeaderboard } from '$lib/server/leaderboard';
export const GET = async () => {
	try {
		const topUsers = await db
			.select({
				userName: leaderboard.userName,
				completedLevels: leaderboard.completedLevels,
				totalTime: leaderboard.totalTime,
				lastCompletedAt: leaderboard.lastCompletedAt
			})
			.from(leaderboard)
			.orderBy(desc(leaderboard.completedLevels), sql`${leaderboard.totalTime} ASC NULLS LAST`)
			.limit(100);
		return json({ leaderboard: topUsers });
	} catch (error) {
		console.error('Error fetching leaderboard:', error);
		return json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
	}
};
export const POST = async (event: any) => {
	const session = await auth.api.getSession({ headers: event.request.headers });
	if (!session?.user?.id) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	const result = await updateLeaderboard(session.user.id);
	if (result.success) {
		return json({ success: true });
	} else {
		return json({ error: 'Failed to update leaderboard' }, { status: 500 });
	}
};
