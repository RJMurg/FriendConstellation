import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async () => {
    const starboard = await prisma.starboard.findMany({
        orderBy: {
            stars: 'desc'
        }
    });
    return {
        starboard: starboard
    };
}) satisfies PageServerLoad;