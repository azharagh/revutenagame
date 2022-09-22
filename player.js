export default class Player {

    rightPressed = false;
    leftPressed = false; 
    shootPressed = false; 
    //upPressed = false; 
    //downPressed = false; 

    constructor(canvas, velocity, health, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.health = health; 
        this.bulletController = bulletController; 

        this.x = this.canvas.width / 10;
        this.y = this.canvas.height - 251;

        this.width = 69;
        this.height = 100;

        this.image = new Image();
        this.image.src = "images/Utena.png";

        document.addEventListener("keydown", this.keydown); 
        document.addEventListener("keyup", this.keyup); 
    }

    draw(ctx) {
        if(this.shootPressed) {
            this.bulletController.shoot(this.x + this.width, this.y + this.height / 2, 6, 1, 10); 
        }

        this.move(); 
        this.collideWithWalls(); 
       
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        ctx.fillStyle = "red";
        ctx.font = "25px didot";
        ctx.fillText(this.health, this.x, this.y);
    }

    collideWithWalls() {
        //left
        if(this.x < this.canvas.width / 10) {
            this.x = this.canvas.width / 10;
        }
        //right -player's width
        if(this.x > this.canvas.width - (this.width * 2) + 9) {
            this.x = this.canvas.width - (this.width * 2) + 9; 
        }
        //up
        /**if(this.y < this.height - this.height + 21) {
            this.y = this.height - this.height + 21; 
        }
        //down
        if(this.y > this.canvas.height - this.height) {
            this.y = this.canvas.height - this.height; 
        }*/
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    move() {
        if (this.rightPressed) {
            this.x += this.velocity;
        } else if (this.leftPressed) {
            this.x += -this.velocity;
        } /**else if (this.upPressed) {
            this.y -= this.velocity;
        } else if(this.downPressed) {
            this.y += this.velocity; 
        } */
    }

    keydown = event => {
        if(event.code == 'ArrowRight') {
            this.rightPressed = true; 
        }
        if(event.code == 'ArrowLeft') {
            this.leftPressed = true; 
        }
        if(event.code == "Space") {
            this.shootPressed = true; 
        }
        /**if(event.code == 'ArrowUp') {
            this.upPressed = true;
        }
        if(event.code == 'ArrowDown') {
            this.downPressed = true; 
        }*/
    };
    keyup = event => {
        if(event.code == 'ArrowRight') {
            this.rightPressed = false; 
        }
        if(event.code == 'ArrowLeft') {
            this.leftPressed = false; 
        }
        if(event.code == "Space") {
            this.shootPressed = false; 
        }
        /**if(event.code == 'ArrowUp') {
            this.upPressed = false;
        }
        if(event.code == 'ArrowDown') {
            this.downPressed = false; 
        }*/
    }; 

}