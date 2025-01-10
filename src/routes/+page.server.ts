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

	const players: internalPlayer[] = orderPlayers(rawPlayers);

	const tasks = await prisma.tasks.findMany({
		where: {
			active: true
		},
		orderBy: [
			{
				reward: 'desc'
			},
			{
				title: 'asc'
			}
		]
	});

	const cosmetics = await prisma.shop.findMany({
		where: {
			active: true
		},
		orderBy: [
			{
				cost: 'asc'
			},
			{
				name: 'asc'
			}
		]
	});

	return {
		players,
		tasks,
		cosmetics
	};
}) satisfies PageServerLoad;
