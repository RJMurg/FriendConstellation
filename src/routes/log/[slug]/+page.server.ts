import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { config } from 'dotenv';

config();

export const load = (async ({ params }) => {
	const userId = params.slug;

	const player = await prisma.users.findFirst({
		where: {
			id: Number(userId)
		}
	});

	const logs = await prisma.logs.findMany({
		where: {
			user_id: Number(userId)
		},
		orderBy: {
			timestamp: 'desc'
		}
	});

	return {
		title: process.env.STARBOARD_TITLE || 'Starboard',
		player,
		logs
	};
}) satisfies PageServerLoad;
