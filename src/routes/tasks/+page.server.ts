import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { breakdownStars } from '$lib/starBreakdown';

export const load = (async () => {
    const taskList = await prisma.tasks.findMany({
        orderBy: {
            reward: 'desc'
        }
    });

    return {
        tasks: taskList
    };
}) satisfies PageServerLoad;