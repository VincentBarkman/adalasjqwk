import type { RequestHandler } from './$types';
export const GET: RequestHandler = async () => {
	const robotsTxt = `User-agent: *
Disallow: /admin
Disallow: /secret
Disallow: /hidden
# Secret flag: XMAS{robots_txt_secrets}
# Don't tell anyone about /super-secret-admin-panel
`;
	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
