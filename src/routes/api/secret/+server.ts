import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = async () => {
	return json(
		{ message: 'Inget att se här...' },
		{
			headers: {
				'X-Secret-Flag': 'XMAS{hidden_headers}',
				'X-Christmas-Hint': 'Kolla i response headers!'
			}
		}
	);
};
