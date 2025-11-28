import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ request }) => {
	const { token } = await request.json();
	try {
		const decoded = atob(token);
		const payload = JSON.parse(decoded);
		if (payload.role === 'admin' || payload.isAdmin === true) {
			return json({
				success: true,
				flag: 'XMAS{jwt_manipulation}',
				message: 'Admin access granted!',
				payload
			});
		}
		return json({
			success: false,
			message: 'Access denied. Not an admin.',
			payload
		});
	} catch (e) {
		return json({
			success: false,
			message: 'Invalid token',
			hint: 'Try base64 encoding: {"role":"admin","user":"hacker"}'
		});
	}
};
export const GET: RequestHandler = async () => {
	const userToken = btoa(JSON.stringify({ role: 'user', user: 'guest' }));
	return json({
		token: userToken,
		hint: 'Decode this token, change role to admin, and send it back!'
	});
};
