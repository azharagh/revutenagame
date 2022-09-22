import Bullet from "./bullet.js"; 

export default class BulletController {
    bullets = [];
    //as soon as you hit space you want the first bullet to be fired
    timeTillNextBulletAllowed = 0;

    constructor(canvas, maxBulletsAtATime, soundEnabled) {
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.soundEnabled = soundEnabled; 

        this.swordSound = new Audio("sounds/sword.wav"); 
        this.swordSound.volume = 0.09 ;
    }

    draw(ctx) {
        //filter for bullets visible onscreen
        this.bullets = this.bullets.filter(
            (bullet) => bullet.y + bullet.width > 0 && bullet.x <= this.canvas.width 
          ); 

        this.bullets.forEach((bullet) => bullet.draw(ctx)); 

        if(this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }

    shoot(x, y, velocity, damage, timeTillNextBulletAllowed = 0) {
        if(this.timeTillNextBulletAllowed <= 0 && this.bullets.length < this.maxBulletsAtATime){
            const bullet = new Bullet(this.canvas, x, y, velocity, damage); 
            this.bullets.push(bullet);
            if(this.soundEnabled) {
                this.swordSound.currentTime = 0; //reset if sound already playing
                this.swordSound.play(); 
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }

    collideWith(sprite) {
        //query bullets list and see if at least one bullet is hitting the sprite
        return this.bullets.some(bullet => {
            if(bullet.collideWith(sprite)) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
                return true; 
            }
            return false; 
        });
    }    
}