export const breakdownStars = (stars: number) => {
    const starBreakdown = {
        hundredStars: 0,
        fiftyStars: 0,
        tenStars: 0,
        fiveStars: 0,
        stars: 0,
        negative: false,
        total: 0
    };

    starBreakdown.total = stars;

    while(stars > 0){
        if(stars % 100 == 0){
            stars -= 100;
            starBreakdown.hundredStars++;
        }
        else if(stars % 50 == 0){
            stars -= 50;
            starBreakdown.fiftyStars++;
        }
        else if(stars % 10 == 0){
            stars -= 10;
            starBreakdown.tenStars++;
        }
        else if(stars % 5 == 0){
            stars -= 5;
            starBreakdown.fiveStars++;
        }
        else{
            stars--;
            starBreakdown.stars++;
        }
    }

    while(stars < 0){
        starBreakdown.negative = true;
        if(stars % 100 == 0){
            stars += 100;
            starBreakdown.hundredStars++;
        }
        else if(stars % 50 == 0){
            stars += 50;
            starBreakdown.fiftyStars++;
        }
        else if(stars % 10 == 0){
            stars += 10;
            starBreakdown.tenStars++;
        }
        else if(stars % 5 == 0){
            stars += 5;
            starBreakdown.fiveStars++;
        }
        else{
            stars++;
            starBreakdown.stars++;
        }
    }

    return starBreakdown;
}