import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { delay, orderPlayers } from '$lib';
import { produce } from 'sveltekit-sse';

export const POST: RequestHandler = async () => {
	return produce(async function start({ emit }) {
		while (true) {
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

			const { error } = emit('players', JSON.stringify(players));

			if (error) {
				return;
			}

			delay(5000);
		}
	});
};
