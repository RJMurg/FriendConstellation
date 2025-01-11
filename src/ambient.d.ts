type Stars = {
	stars: number;
	fiveStars: number;
	tenStars: number;
	fiftyStars: number;
	hundredStars: number;
};

type internalPlayer = {
	id: number;
	name: string;
	stars: number;
	position: number;
	jointPosition: boolean;
	font: string;
	card: string;
	animation: string;
	hat: string;
};

type player = {
	id: number;
	name: string;
	stars: number;
	font: string;
	card: string;
	animation: string;
	hat: string;
};

type buttonTypes = 'default' | 'secondary';
