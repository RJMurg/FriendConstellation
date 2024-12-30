import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async ({ params }) => {
	const userId = params.slug;

	const player = await prisma.users.findFirst({
		where: {
			id: Number(userId)
		}
	});

	const logs = await prisma.logs.findMany({
		where: {
			user_id: Number(userId)
		},
		orderBy: {
			timestamp: 'desc'
		}
	});

	return {
		player,
		logs
	};
}) satisfies PageServerLoad;
