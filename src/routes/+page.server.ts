import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async () => {
	const players = await prisma.users.findMany({
		orderBy: {
			stars: 'desc'
		}
	});

	const tasks = await prisma.tasks.findMany({
		orderBy: {
			reward: 'desc'
		}
	});

	return {
		players,
		tasks
	};
}) satisfies PageServerLoad;
