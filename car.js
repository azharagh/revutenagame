export default class Car {
    constructor(x, y, imageNumber) {
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 70;

        this.image = new Image();
        this.image.src = `images/car${imageNumber}.png`; 
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height); 
    }

    move(xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity; 
    }
}