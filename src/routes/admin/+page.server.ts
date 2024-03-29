import type { PageServerLoad, Actions } from './$types';
import prisma from '$lib/server/prisma';
import { breakdownStars } from '$lib/starBreakdown';

// Read in info from .env file
import { config } from 'dotenv';
config();

export const load: PageServerLoad = async ({ cookies }) => {
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
	// Check if admin cookie is set
	if (cookies.get('admin') === 'true') {
		// Return success
		return {
			status: 200,
			message: 'Successfully logged in.',
			starboard: parsedStars
		};
	} else {
		// Return failure
		return {
			status: 500,
			message: 'Not logged in.',
			starboard: parsedStars
		};
	}
};

export const actions = {
	login: async ({ cookies, request }) => {
		const reqData = await request.formData();

		// Returns as format:
		// FormData {
		//  "password" => "string"
		// }

		// Check if password is correct from .env file
		if (reqData.get('password') === process.env.ADMIN_PASSWORD) {
			// Set cookie to true, with age of 2 hours
			cookies.set('admin', 'true', {
                maxAge: 7200,
                secure: false,
                path: '/admin'
            });

			// Return success
			return {
				status: 200,
				message: 'Successfully logged in'
			};
		} else {
			// Return failure
			return {
				status: 500,
				message: 'Incorrect password'
			};
		}
	},
	logout: async ({ cookies }) => {
		// Set cookie to false, with age of -1 (expires immediately)
		cookies.set('admin', 'false', {
			maxAge: -1,
			path: '/'
		});
	},
	deletePerson: async ({ request }) => {
		const reqData = await request.formData();

		const result = await prisma.starboard.delete({
			where: {id: Number(reqData.get('id'))}
		});
	},
	updatePerson: async ({ request }) => {
		const reqData = await request.formData();
		const initialStars = await prisma.starboard.findUnique({
			where: {id: Number(reqData.get('id'))}
		});

		const newStarTotal = initialStars?.stars + BigInt(reqData.get('stars'));

		const result = await prisma.starboard.update({
			where: { id: Number(reqData.get('id')) },
			data: {stars: newStarTotal}
		});
	},
	addPerson: async ({ request }) => {
		const reqData = await request.formData();

		const result = await prisma.starboard.create({
			data: {name: String(reqData.get('name')), stars: BigInt(0)}
		});
	}
} satisfies Actions;