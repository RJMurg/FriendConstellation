import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { arePlayersTied } from '$lib';

export const load = (async () => {
	const players = await prisma.users.findMany({
		orderBy: [
			{
				stars: 'desc'
			},
			{
				name: 'asc'
			}
		]
	});

	let internalPlayers: internalPlayer[] = [];

	for (let i = 0; i < players.length; i++) {
		const player = players[i];
		let position = i + 1;
		let jointPosition = false;

		if(i == 0){
			jointPosition = arePlayersTied(player, players[i + 1]);
		} else if(i > 0) {
			jointPosition = arePlayersTied(player, players[i - 1]);

			// This could be made shorter with a ternary, but I prefer long-hand
			if(jointPosition){
				position = internalPlayers[i - 1].position;
			} else if (i !== players.length - 1 && arePlayersTied(player, players[i + 1])) {
				jointPosition = true;
			}
		}

		internalPlayers.push({
			id: player.id,
			name: player.name,
			stars: player.stars,
			position,
			jointPosition
		});
	}

	const tasks = await prisma.tasks.findMany({
		orderBy: {
			reward: 'desc'
		}
	});

	return {
		players: internalPlayers,
		tasks
	};
}) satisfies PageServerLoad;
