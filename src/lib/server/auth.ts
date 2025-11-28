import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { createAuthMiddleware, APIError } from 'better-auth/api';
import { env } from '$env/dynamic/private';
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID as string,
			clientSecret: env.GOOGLE_CLIENT_SECRET as string
		}
	},
	hooks: {
		before: createAuthMiddleware(async (ctx) => {
			if (ctx.path === '/callback/google') {
				const email = ctx.body?.email || ctx.query?.email;
				if (email && !email.endsWith('@stockholmscience.se')) {
					throw new APIError('FORBIDDEN', {
						message: 'Only users with @stockholmscience.se email addresses are allowed to sign in.'
					});
				}
			}
		}),
		after: createAuthMiddleware(async (ctx) => {
			if (ctx.path.startsWith('/sign-in') || ctx.path.startsWith('/callback')) {
				const newSession = ctx.context.newSession;
				if (newSession?.user?.email && !newSession.user.email.endsWith('@stockholmscience.se')) {
					throw new APIError('FORBIDDEN', {
						message: 'Only users with @stockholmscience.se email addresses are allowed.'
					});
				}
			}
		})
	}
});
