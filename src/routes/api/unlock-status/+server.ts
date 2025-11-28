import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = async ({ url }) => {
	const level = parseInt(url.searchParams.get('level') || '1');
	const now = new Date();
	const stockholmTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' }));
	const month = stockholmTime.getMonth(); // 0-indexed (11 = December)
	const day = stockholmTime.getDate();
	const hour = stockholmTime.getHours();
	let unlocked = false;
	if (month === 11) {
		// December
		if (day > level || (day === level && hour >= 12)) {
			unlocked = true;
		}
	}
	return json({
		level,
		unlocked,
		currentDate: stockholmTime.toISOString(),
		month: month + 1, // Return 1-indexed for readability
		day,
		hour
	});
};
