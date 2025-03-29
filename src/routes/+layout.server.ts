import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: LayoutServerLoad = async () => {
	const gameDetails = await prisma.game.findFirst();

	if (gameDetails === null) {
		return {
			gameDetails: {
				active: false,
				name: 'Starboard',
				subtitle: 'Star Harder',
				showInstagram: false,
				shopEnabled: false,
				tasksEnabled: false,
				scoreboardEnabled: false
			}
		};
	}

	return {
		gameDetails
	};
};
