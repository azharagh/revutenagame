export default class Bullet {

    colours = [
        "#4c3c7c",
        "#f88cbc",
    ]

    constructor(canvas, x, y, velocity, damage) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.damage = damage; 

        this.bulletColour = this.colours[Math.floor(Math.random() * this.colours.length)];

        this.width = 20;
        this.height = 5;
    }

    draw(ctx) {
        this.x += this.velocity;
        ctx.fillStyle = this.bulletColour;
        ctx.fillRect(this.x, this.y, this.width, this.height); 
    }

    collideWith(sprite) {
        if (
          this.x < sprite.x + sprite.width &&
          this.x + this.width > sprite.x &&
          this.y < sprite.y + sprite.height &&
          this.y + this.height > sprite.y
        ) {
          sprite.takeDamage(this.damage);
          return true;
        }
        return false;
    }
}