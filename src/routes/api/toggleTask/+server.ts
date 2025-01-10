import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { id, active, token } = await request.json();

	const validToken = await prisma.logins.findFirst({
		where: {
			token
		}
	});

	if (validToken) {
		await prisma.tasks.update({
			where: {
				id
			},
			data: {
				active
			}
		});

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	}

	return new Response(JSON.stringify({ success: false }), { status: 400 });
};
