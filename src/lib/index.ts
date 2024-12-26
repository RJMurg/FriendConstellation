// place files you want to import through the `$lib` alias in this folder.

/**
 * Adds the relevant suffix to a number for positions
 * @param position the position to be stringified
 * @returns The position with 'st', 'nd', 'rd' or 'th' added
 */
export function stringifyPosition(position: number): string {
	const positionArray = position.toString().split('');
    const lastDigit = positionArray[positionArray.length - 1];

	if (lastDigit === '1') {
		return positionArray.toString() + 'st';
	} else if (lastDigit === '2') {
		return positionArray.toString() + 'nd';
	} else if (lastDigit === '3') {
		return positionArray.toString() + 'rd';
	}

	return positionArray.toString() + 'th';
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
	}
}