import type { PageServerLoad, Actions } from './$types';
import prisma from '$lib/server/prisma';
import { sendWebhookMessage } from '$lib';

export const load = (async ({ params }) => {
	const uuid = params.slug;

	const message = await prisma.tamperEvidentMessages.findFirst({
		where: {
			uuid: uuid
		}
	});

	const exists = message !== null;
	const opened = message?.opened;

	if (opened) {
		return {
			exists,
			opened,
			message,
			uuid
		};
	}

	return {
		exists,
		opened,
		uuid
	};
}) satisfies PageServerLoad;

export const actions = {
	openMessage: async ({ request }) => {
		const formData = await request.formData();
		const uuid = formData.get('uuid') as string | null;
		if (!uuid) {
			throw new Error('UUID is missing');
		}

		const message = await prisma.tamperEvidentMessages.update({
			where: {
				uuid: uuid
			},
			data: {
				opened: true,
				timestamp: new Date()
			}
		});

		const webhooks = await prisma.webhooks.findMany({
			where: {
				showTampers: true
			}
		});

		const webhookContent =
			'A tamper-evident message has been opened!\n' +
			'**Title:** ' +
			message.title +
			'\n*' +
			message.message +
			'*\n\n' +
			'[Open message](https://stars.rjm.ie/tamper/' +
			uuid +
			')';

		for (const webhook of webhooks) {
			sendWebhookMessage('Tamper-Evident Message Opened!', webhookContent, webhook.webhook);
		}
	}
} satisfies Actions;
