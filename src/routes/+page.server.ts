import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { breakdownStars } from '$lib/starBreakdown';

export const load = (async () => {
	const starboard = await prisma.starboard.findMany({
		orderBy: {
			stars: 'desc'
		}
	});

	const parsedStars: {
		id: number;
		name: string;
		stars: {
			hundredStars: number;
			fiftyStars: number;
			tenStars: number;
			fiveStars: number;
			stars: number;
			negative: boolean;
			total: number;
		};
	}[] = [];

	for (let i = 0; i < starboard.length; i++) {
		let position = String(i + 1);
		const finalDigit = Number(String(i + 1).slice(-1));

		if (finalDigit == 1) {
			position += 'st';
		} else if (finalDigit == 2) {
			position += 'nd';
		} else if (finalDigit == 3) {
			position += 'rd';
		} else {
			position += 'th';
		}

		const stareeTemplate = {
			id: starboard[i].id,
			name: starboard[i].name ?? '',
			stars: breakdownStars(Number(starboard[i].stars)),
			position: position
		};
		parsedStars.push(stareeTemplate);
	}

	const taskList = await prisma.tasks.findMany({
		orderBy: {
			reward: 'desc'
		}
	});

	const parsedTasks: {
		id: number;
		title: string;
		description: string;
		stars: object;
		reward: {
			hundredStars: number;
			fiftyStars: number;
			tenStars: number;
			fiveStars: number;
			stars: number;
			negative: boolean;
			total: number;
		};
	}[] = [];

	for (let i = 0; i < taskList.length; i++) {
		const taskRewardTemplate = {
			id: taskList[i].id,
			title: taskList[i].title ?? '',
			description: taskList[i].description ?? '', // Handle null value by providing a default value of an empty string
			stars: {}, // Add the missing 'stars' property
			reward: breakdownStars(Number(taskList[i].reward))
		};
		parsedTasks.push(taskRewardTemplate);
	}

	return {
		starboard: parsedStars,
		tasks: parsedTasks
	};
}) satisfies PageServerLoad;
