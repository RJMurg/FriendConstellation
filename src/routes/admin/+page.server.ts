import type { PageServerLoad, Actions } from './$types';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import prisma from '$lib/server/prisma';
import process from 'process';
import { getActionMessage, orderPlayers, sendWebhookMessage } from '$lib';

config();

export const load = (async ({ cookies }) => {
	const token = cookies.get('token');
	let loggedIn = false;

	const tokenFromDatabase = await prisma.logins.findFirst({
		where: {
			token: token
		}
	});

	if (tokenFromDatabase) {
		if (tokenFromDatabase.expires >= new Date()) {
			loggedIn = true;
		}
	}

	if (loggedIn) {
		const rawPlayers = await prisma.users.findMany({
			orderBy: [
				{
					stars: 'desc'
				},
				{
					name: 'asc'
				}
			]
		});

		let players: internalPlayer[] = orderPlayers(rawPlayers);

		const tasks = await prisma.tasks.findMany({
			orderBy: [
				{
					reward: 'desc'
				},
				{
					title: 'asc'
				}
			]
		});

		const webhooks = await prisma.webhooks.findMany();

		return {
			loggedIn,
			players,
			tasks,
			webhooks
		};
	}

	return {
		loggedIn
	};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ cookies, request }) => {
		const formData = await request.formData();
		const password = formData.get('password');

		if (password === process.env.ADMIN_PASSWORD) {
			const newToken = uuidv4();

			await prisma.logins.create({
				data: {
					token: newToken,
					expires: new Date(Date.now() + 1000 * 60 * 60)
				}
			});

			cookies.set('token', newToken, {
				maxAge: 60 * 60,
				path: '/'
			});

			const players = await prisma.users.findMany({
				orderBy: {
					stars: 'desc'
				}
			});

			const tasks = await prisma.tasks.findMany({
				orderBy: {
					reward: 'desc'
				}
			});

			const webhooks = await prisma.webhooks.findMany();

			return {
				attemptSuccessful: true,
				players,
				tasks,
				webhooks
			};
		} else {
			return {
				attemptSuccessful: false
			};
		}
	},

	logout: async ({ cookies }) => {
		const token = cookies.get('token');

		await prisma.logins.deleteMany({
			where: {
				token: token
			}
		});

		cookies.delete('token', {
			path: '/'
		});
	},

	addPlayer: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const stars = String(formData.get('stars'));

		await prisma.users.create({
			data: {
				name: String(name),
				stars: parseInt(stars)
			}
		});
	},

	deletePlayer: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id'));

		// We have to delete the relevant logs first to avoid a constraint violation
		await prisma.logs.deleteMany({
			where: {
				user_id: parseInt(id)
			}
		});

		await prisma.users.delete({
			where: {
				id: parseInt(id)
			}
		});
	},

	updateStars: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id'));
		const stars = String(formData.get('stars'));
		const log = String(formData.get('log'));

		const currentStars = await prisma.users.findFirst({
			where: {
				id: parseInt(id)
			}
		});

		const newStars = parseInt(stars) + (currentStars?.stars ?? 0);

		await prisma.users.update({
			where: {
				id: parseInt(id)
			},
			data: {
				stars: newStars
			}
		});

		const actionMessage = getActionMessage(parseInt(stars), log);

		await prisma.logs.create({
			data: {
				user_id: parseInt(id),
				action: actionMessage
			}
		});
	},

	addTask: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const stars = String(formData.get('stars'));

		await prisma.tasks.create({
			data: {
				title: String(name),
				description: String(description),
				reward: parseInt(stars)
			}
		});

		let webhookContent =
			'A new task has been added to the [starboard](https://stars.rjm.ie/)!\n' +
			'**Title:** ' +
			name +
			'\n*' +
			description +
			'*\n\n' +
			'**Reward:** Up to ' +
			stars;

		if (Number(stars) == 1 || Number(stars) == -1) {
			webhookContent += ' star!';
		} else {
			webhookContent += ' stars!';
		}

		const webhooks = await prisma.webhooks.findMany();

		for (const webhook of webhooks) {
			sendWebhookMessage(webhookContent, webhook.webhook);
		}
	},

	deleteTask: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id'));

		await prisma.tasks.delete({
			where: {
				id: parseInt(id)
			}
		});
	},

	addWebhook: async ({ request }) => {
		const formData = await request.formData();
		const url = formData.get('url');
		const name = formData.get('name');

		await prisma.webhooks.create({
			data: {
				name: String(name),
				webhook: String(url)
			}
		});
	},

	deleteWebhook: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id'));

		await prisma.webhooks.delete({
			where: {
				id: parseInt(id)
			}
		});
	}
} satisfies Actions;
