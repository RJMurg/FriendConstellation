import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
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

    const parsedStars: { id: number; name: string; stars: object; }[] = [];

    for(let i = 0; i < starboard.length; i++){
        let position = String(i + 1);
        const finalDigit = Number(String(i + 1).slice(-1));

        if(finalDigit == 1){
            position += "st";
        }
        else if(finalDigit == 2){
            position += "nd";
        }
        else if(finalDigit == 3){
            position += "rd";
        }
        else{
            position += "th";
        }


        const stareeTemplate = {
            id: starboard[i].id,
            name: starboard[i].name ?? '',
            stars: breakdownStars(Number(starboard[i].stars)),
            position: position
        }
        parsedStars.push(stareeTemplate);
    }

	// Check if admin cookie is set
	if (cookies.get('admin') == 'true') {
		// Return success
		return {
			loggedIn: true,
			starboard: parsedStars,
			tasks: parsedTasks
		};
	} else {
		// Return failure
		return {
			loggedIn: false,
			starboard: parsedStars,
			tasks: parsedTasks
		};
	}
};

export const actions = {
	login: async ({ cookies, request }) => {
		const reqData = await request.formData();

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
			};
		} else {
			cookies.set('admin', 'false', {
				maxAge: -1,
				path: '/admin'
			});

			// Return failure
			return {
				status: 500,
			};
		}
	},
	logout: async ({ cookies }) => {
		// Set cookie to false, with age of -1 (expires immediately)
		cookies.set('admin', 'false', {
			maxAge: -1,
			path: '/admin'
		});

		return {
			status: 500
		}
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
	},
	createTask: async ({ request }) => {
		const reqData = await request.formData();

		const result = await prisma.tasks.create({
			data: {
				title: String(reqData.get('title')),
				description: String(reqData.get('description')),
				reward: BigInt(reqData.get('reward')),
			}
		});
	},
	deleteTask: async ({ request }) => {
		const reqData = await request.formData();

		const result = await prisma.tasks.delete({
			where: {id: Number(reqData.get('id'))}
		});
	}
} satisfies Actions;