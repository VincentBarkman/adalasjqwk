declare global {
	namespace App {
		interface Locals {
			session?: {
				id: string;
				userId: string;
				token: string;
				expiresAt: Date;
				ipAddress?: string;
				userAgent?: string;
				createdAt: Date;
				updatedAt: Date;
			};
			user?: {
				id: string;
				name: string;
				email: string;
				emailVerified: boolean;
				image?: string;
				createdAt: Date;
				updatedAt: Date;
			};
		}
	}
}
export {};
