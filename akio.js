export default class Akio {

    fireBulletTimerDefault = 2;
    fireBulletTimer = this.fireBulletTimerDefault;

    constructor(canvas, velocity, health, akioBulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.health = health;
        this.akioBulletController = akioBulletController;  

        this.x = 666;
        this.y = this.canvas.height - 251;

        this.width = 69;
        this.height = 100;

        this.image = new Image();
        this.image.src = "images/akio.png";

    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.font = "25px didot";
        ctx.fillText(this.health, this.x, this.y);
        this.fireBullet(); 
    } 


    fireBullet() {
        this.fireBulletTimer--;
        if(this.fireBulletTimer <= 0) {
            this.fireBulletTimer = this.fireBulletTimerDefault;
            this.akioBulletController.shoot(this.x, this.y + this.height / 2, -5, 3.3);
        }
    }
    
    takeDamage(damage) {
        this.health -= damage; 
    }
}