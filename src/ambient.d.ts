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
}

type player = {
	id: number;
	name: string;
	stars: number;
}

type buttonTypes = 'default' | 'secondary';
