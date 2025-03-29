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

		const players: internalPlayer[] = orderPlayers(rawPlayers);

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

		const cosmetics = await prisma.shop.findMany({
			orderBy: [
				{
					cost: 'desc'
				},
				{
					name: 'asc'
				}
			]
		});

		const webhooks = await prisma.webhooks.findMany();

		const messages = await prisma.tamperEvidentMessages.findMany();

		const gameSettings = await prisma.game.findFirst();

		return {
			loggedIn,
			players,
			tasks,
			webhooks,
			messages,
			cosmetics,
			gameSettings,
			token
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

	updatePlayer: async ({ request }) => {
		const formData = await request.formData();
		const id = parseInt(String(formData.get('id')));
		const name = String(formData.get('name'));
		const card = String(formData.get('card'));
		const font = String(formData.get('font'));
		const animation = String(formData.get('animation'));
		const hat = String(formData.get('hat'));

		await prisma.users.update({
			where: {
				id
			},
			data: {
				name,
				card,
				font,
				animation,
				hat
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
		const checked = Boolean(formData.get('active'));

		await prisma.tasks.create({
			data: {
				title: String(name),
				description: String(description),
				reward: parseInt(stars),
				active: checked
			}
		});

		if (checked) {
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

			const webhooks = await prisma.webhooks.findMany({
				where: {
					showTasks: true
				}
			});

			for (const webhook of webhooks) {
				sendWebhookMessage('Starboard', 'New Task Added!', webhookContent, webhook.webhook);
			}
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
		const showTasks = formData.get('tasks') === 'true';
		const showTampers = formData.get('tamper') === 'true';

		await prisma.webhooks.create({
			data: {
				name: String(name),
				webhook: String(url),
				showTasks,
				showTampers
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
	},

	addMessage: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('name');
		const message = formData.get('message');
		const uuid = uuidv4();

		await prisma.tamperEvidentMessages.create({
			data: {
				uuid,
				title: String(title),
				message: String(message)
			}
		});
	},

	deleteMessage: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id'));

		await prisma.tamperEvidentMessages.delete({
			where: {
				id: parseInt(id)
			}
		});
	},

	addCosmetic: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const cost = String(formData.get('cost'));
		const description = formData.get('description');
		const card = formData.get('card');
		const font = formData.get('font');
		const animation = formData.get('animation');
		const hat = formData.get('hat');
		const active = formData.get('active') === 'true';

		await prisma.shop.create({
			data: {
				name: String(name),
				cost: parseInt(cost),
				description: String(description),
				card: String(card),
				font: String(font),
				animation: String(animation),
				hat: String(hat),
				active
			}
		});

		return;
	},

	modifyCosmetic: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id'));
		const name = formData.get('name');
		const cost = String(formData.get('cost'));
		const description = formData.get('description');
		const card = formData.get('card');
		const font = formData.get('font');
		const animation = formData.get('animation');
		const hat = formData.get('hat');
		const active = formData.get('active') === 'true';

		await prisma.shop.update({
			where: {
				id: parseInt(id)
			},
			data: {
				name: String(name),
				cost: parseInt(cost),
				description: String(description),
				card: String(card),
				font: String(font),
				animation: String(animation),
				hat: String(hat),
				active
			}
		});

		return;
	},

	deleteCosmetic: async ({ request }) => {
		const formData = await request.formData();
		const id = String(formData.get('id'));

		await prisma.shop.delete({
			where: {
				id: parseInt(id)
			}
		});

		return;
	},

	updateGameDetails: async ({ request }) => {
		const formData = await request.formData();
		const doesGameExist = (await prisma.game.findFirst()) !== null;

		console.log(formData);

		if (doesGameExist) {
			await prisma.game.update({
				where: {
					id: 0
				},
				data: {
					name: String(formData.get('name')),
					subtitle: String(formData.get('subtitle')),
					active: formData.get('active') === 'on',
					showInstagram: formData.get('showInstagram') === 'on',
					shopEnabled: formData.get('shopEnabled') === 'on',
					tasksEnabled: formData.get('tasksEnabled') === 'on',
					scoreboardEnabled: formData.get('scoreboardEnabled') === 'on'
				}
			});
		} else {
			await prisma.game.create({
				data: {
					id: 0,
					name: String(formData.get('name')),
					subtitle: String(formData.get('subtitle')),
					active: formData.get('active') === 'on',
					showInstagram: formData.get('showInstagram') === 'on',
					shopEnabled: formData.get('shopEnabled') === 'on',
					tasksEnabled: formData.get('tasksEnabled') === 'on',
					scoreboardEnabled: formData.get('scoreboardEnabled') === 'on'
				}
			});
		}

		return;
	}
} satisfies Actions;
