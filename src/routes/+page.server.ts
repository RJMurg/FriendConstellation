import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { orderPlayers } from '$lib';

export const load = (async () => {
	const rawPlayers = await prisma.users.findMany({
		orderBy: [
			{
				stars: 'desc'
			},
			{
				name: 'asc'
			}
		]
	});

	let players: internalPlayer[] = orderPlayers(rawPlayers);

	const tasks = await prisma.tasks.findMany({
		orderBy: [
			{
				reward: 'desc'
			},
			{
				title: 'asc'
			}
		]
	});

	return {
		players,
		tasks
	};
}) satisfies PageServerLoad;
