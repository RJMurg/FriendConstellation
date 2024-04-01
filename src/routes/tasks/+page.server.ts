import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { breakdownStars } from '$lib/starBreakdown';

export const load = (async () => {
    const taskList = await prisma.tasks.findMany({
        orderBy: {
            reward: 'desc'
        }
    });

    const parsedTasks: {id: number, title: string, description: string, stars: object; reward: { hundredStars: number, fiftyStars: number, tenStars: number, fiveStars: number, stars: number, negative: boolean, total: number } }[] = [];

    for(let i = 0; i < taskList.length; i++){
        const taskRewardTemplate = {
            id: taskList[i].id,
            title: taskList[i].title ?? '',
            description: taskList[i].description ?? '', // Handle null value by providing a default value of an empty string
            stars: {}, // Add the missing 'stars' property
            reward: breakdownStars(Number(taskList[i].reward))
        }
        parsedTasks.push(taskRewardTemplate);
    }
    return {
        tasks: parsedTasks
    };
}) satisfies PageServerLoad;