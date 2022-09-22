export default class Anthy {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 69;
        this.height = 100;

        this.image = new Image();
        this.image.src = "images/anthy.png";
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height); 
    }
}