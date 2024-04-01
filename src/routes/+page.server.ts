import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { breakdownStars } from '$lib/starBreakdown';

export const load = (async () => {
    const starboard = await prisma.starboard.findMany({
        orderBy: {
            stars: 'desc'
        }
    });

    const parsedStars: { id: number; name: string; stars: object; }[] = [];

    for(let i = 0; i < starboard.length; i++){
        const stareeTemplate = {
            id: starboard[i].id,
            name: starboard[i].name ?? '',
            stars: breakdownStars(Number(starboard[i].stars))
        }
        parsedStars.push(stareeTemplate);
    }

    return {
        starboard: parsedStars
    };
}) satisfies PageServerLoad;