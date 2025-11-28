import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ request }) => {
	const { username, password } = await request.json();
	const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
	if (
		username.includes("' OR '1'='1") ||
		username.includes("' OR 1=1") ||
		username.includes("admin' --") ||
		password.includes("' OR '1'='1") ||
		password.includes("' OR 1=1")
	) {
		return json({
			success: true,
			flag: 'XMAS{sql_injection_master}',
			message: 'Inloggad som admin!',
			query
		});
	}
	return json({
		success: false,
		message: 'Fel användarnamn eller lösenord',
		query
	});
};
