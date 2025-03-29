// place files you want to import through the `$lib` alias in this folder.

/**
 * Adds the relevant suffix to a number for positions
 * @param position the position to be stringified
 * @returns The position with 'st', 'nd', 'rd' or 'th' added
 */
export function stringifyPosition(position: number): string {
	const positionArray = position.toString().split('');
	const lastDigit = positionArray[positionArray.length - 1];
	const lastTwoDigits = positionArray[positionArray.length - 2] + lastDigit;

	// Because ordinal numbers are weird, exceptions for the 'st', 'nd', 'rd' and 'th' suffixes are needed
	// For digits 11 through 13 inclusive, the ordinal rules apply an exception and just add 'th'
	// Thanks English.
	if (lastTwoDigits !== '11' && lastTwoDigits !== '12' && lastTwoDigits !== '13') {
		if (lastDigit === '1') {
			return positionArray.join('') + 'st';
		} else if (lastDigit === '2') {
			return positionArray.join('') + 'nd';
		} else if (lastDigit === '3') {
			return positionArray.join('') + 'rd';
		}
	}

	return positionArray.join('') + 'th';
}

/**
 * This function takes a number of stars and returns an object with the stars broken down in the relevant sections
 * @param stars the stars to be parsed
 * @returns An object with the stars in 1s, 5s, 10s, 50s and hundreds
 */
export function parseStars(stars: number): Stars {
	const hundredStars = Math.floor(stars / 100);
	stars = stars - hundredStars * 100;

	const fiftyStars = Math.floor(stars / 50);
	stars = stars - fiftyStars * 50;

	const tenStars = Math.floor(stars / 10);
	stars = stars - tenStars * 10;

	const fiveStars = Math.floor(stars / 5);
	stars = stars - fiveStars * 5;

	const oneStars = stars || 0;

	return {
		hundredStars,
		fiftyStars,
		tenStars,
		fiveStars,
		stars: oneStars
	};
}

/**
 * Fills the action message with the relevant information
 * @param stars the amount of stars added or removed
 * @param log the reason this action took place
 * @returns A string following the format 'Had {stars} stars {added/removed} due to {log}'
 */
export function getActionMessage(stars: number, log: string): string {
	let message = Math.abs(stars) + ' star';

	if (Math.abs(stars) !== 1) {
		message += 's ';
	} else {
		message += ' ';
	}

	if (stars < 0) {
		message += 'removed for ';
	} else {
		message += 'added for ';
	}

	if (!log.endsWith('.') || !log.endsWith('!') || !log.endsWith('?')) {
		log += '.';
	}

	message += log;

	return message;
}

/**
 * Sends a message to a Discord webhook
 * @param username The username of the message
 * @param title The title of the message
 * @param content The content of the message
 * @param webhook The URL of the webhook
 */
export function sendWebhookMessage(
	username: string,
	title: string,
	content: string,
	webhook: string
): void {
	fetch(webhook, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			content: '',
			embeds: [
				{
					title: title,
					description: content,
					color: 11765248
				}
			],
			username: username,
			avatar_url: 'https://stars.rjm.ie/favicon.webp'
		})
	}).then();
}

export function orderPlayers(players: player[]): internalPlayer[] {
	const internalPlayers: internalPlayer[] = [];

	if (players.length === 0 || players.length === 1) {
		for (let i = 0; i < players.length; i++) {
			const player = players[i];
			internalPlayers.push({
				id: player.id,
				name: player.name,
				stars: player.stars,
				position: 1,
				jointPosition: false,
				font: player.font,
				card: player.card,
				animation: player.animation,
				hat: player.hat
			});
		}

		return internalPlayers;
	}

	for (let i = 0; i < players.length; i++) {
		const player = players[i];
		let position = i + 1;
		let jointPosition = false;

		if (i == 0) {
			jointPosition = arePlayersTied(player, players[i + 1]);
		} else if (i > 0) {
			jointPosition = arePlayersTied(player, players[i - 1]);

			// This could be made shorter with a ternary, but I prefer long-hand
			if (jointPosition) {
				position = internalPlayers[i - 1].position;
			} else if (i !== players.length - 1 && arePlayersTied(player, players[i + 1])) {
				jointPosition = true;
			}
		}

		internalPlayers.push({
			id: player.id,
			name: player.name,
			stars: player.stars,
			position,
			jointPosition,
			font: player.font,
			card: player.card,
			animation: player.animation,
			hat: player.hat
		});
	}

	return internalPlayers;
}

function arePlayersTied(player1: player, player2: player): boolean {
	return player1.stars === player2.stars;
}

/**
 * Set a timer to delay the execution of a script at a point.
 * @param ms The number of milliseconds to delay.
 */
export function delay(ms: number) {
	return new Promise(function run(resolve) {
		setTimeout(resolve, ms);
	});
}
