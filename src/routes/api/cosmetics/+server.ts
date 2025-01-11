import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
	const cosmetics = await prisma.shop.findMany({
		orderBy: {
			cost: 'desc',
			name: 'asc'
		}
	});

	return new Response(JSON.stringify({ cosmetics }), { status: 200 });
};
