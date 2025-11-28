import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});
	if (session) {
		event.locals.session = {
			...session.session,
			ipAddress: session.session.ipAddress ?? undefined,
			userAgent: session.session.userAgent ?? undefined
		};
		event.locals.user = {
			...session.user,
			image: session.user.image ?? undefined
		};
	}
	return svelteKitHandler({ event, resolve, auth, building });
};
