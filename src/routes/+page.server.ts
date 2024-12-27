import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async () => {
	const players = await prisma.users.findMany({
		orderBy: {
			stars: 'desc'
		}
	});

	return {
		players
	};
}) satisfies PageServerLoad;
