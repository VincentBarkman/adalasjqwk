import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
let comments: string[] = [];
export const POST: RequestHandler = async ({ request }) => {
	const { comment } = await request.json();
	comments.push(comment);
	if (comment.toLowerCase().includes('<script>') || comment.toLowerCase().includes('alert(')) {
		return json({
			success: true,
			flag: 'XMAS{xss_hacker}',
			message: 'XSS-attack detekterad! Här är din flagga.',
			comments
		});
	}
	return json({
		success: true,
		message: 'Kommentar tillagd',
		comments
	});
};
export const GET: RequestHandler = async () => {
	return json({ comments });
};
