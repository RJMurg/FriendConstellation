import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { id, selected, token } = await request.json();

	const validToken = await prisma.logins.findFirst({
		where: {
			token
		}
	});

	if (!validToken) {
		return new Response(JSON.stringify({ success: false }), { status: 400 });
	}

	if (selected === '-999' || selected === undefined) {
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} else if (selected === '-998') {
		await prisma.users.update({
			where: {
				id
			},
			data: {
				font: 'font-sans',
				hat: '',
				card: '',
				animation: '',
				cosmetic_id: null
			}
		});
		return new Response(JSON.stringify({ success: true, message: 'Cosmetic values reset' }), {
			status: 200
		});
	}

	const tempCosmetic = await prisma.shop.findFirst({
		where: {
			id: selected
		},
		select: {
			font: true,
			hat: true,
			card: true,
			animation: true,
			id: true
		}
	});

	if (!tempCosmetic) {
		return new Response(JSON.stringify({ success: false, message: 'Cosmetic not found' }), {
			status: 400
		});
	}

	const currentCosmetic = await prisma.users.findFirst({
		where: {
			id
		},
		select: {
			cosmetic_id: true,
			font: true,
			hat: true,
			card: true,
			animation: true
		}
	});

	if (currentCosmetic?.cosmetic_id !== tempCosmetic.id) {
		await prisma.users.update({
			where: {
				id
			},
			data: {
				font: tempCosmetic.font,
				hat: tempCosmetic.hat,
				card: tempCosmetic.card,
				animation: tempCosmetic.animation,
				cosmetic_id: tempCosmetic.id
			}
		});
	}

	return new Response(JSON.stringify({ success: true }), { status: 200 });
};
