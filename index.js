import Player from "./Player.js";
import Anthy from "./anthy.js";
import Akio from "./akio.js"; 
import CarController from "./carcontroller.js";
import BulletController from "./bulletcontroller.js";

const canvas = document.getElementById("DuelingArena"); 
const ctx = canvas.getContext("2d");

document.getElementById("musicButton").addEventListener("mousedown",
function() {
    const music = document.getElementById('music');
    if(this.className == 'is-playing') {
        this.className = "";
        this.innerHTML = "Internal Clock"
        music.pause();
    } else {
        this.className = "is-playing";
        this.innerHTML = "External Clock";
        music.play();
        music.volume = 0.2;
    }
});

canvas.width = 800;
canvas.height = 523;

const background = new Image();
background.src = "images/duelingarena.png"; 

const playerBulletController = new BulletController(canvas, 3, true);
const akioBulletController = new BulletController(canvas, 1, false);

const anthy = new Anthy(372, 270);
const players = [new Player(canvas, 3, 60, playerBulletController)];
const akios = [new Akio(canvas, 3, 3, akioBulletController)]; 

const car = new CarController(canvas); 

let isGameOver = false;
let didWin = false; 

function duel() {
    checkGameOver(); 
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver(); 

    if(!isGameOver) {
        let rosecoffin = new Image();
        rosecoffin.src = "images/rosecoffin.png";
        let x = 355;
        let y = 215;
        let roseWidth = 100; 
        let roseHeight = 150; 
        ctx.drawImage(rosecoffin, x, y, roseWidth, roseHeight);

        anthy.draw(ctx);
        
        akios.forEach(akio => {
            if(playerBulletController.collideWith(akio)) {
                if(akio.health <= 0) {
                    const index = akios.indexOf(akio); 
                    akios.splice(index, 1); 
                    music.pause();
                    this.akioDeathSound = new Audio('sounds/anthySound.wav');
                    this.akioDeathSound.play();
                }
            }
            else {
                akio.draw(ctx);
            } 
        });

        players.forEach(player => {
            if(akioBulletController.collideWith(player)) {
                if(player.health <= 0) {
                    const index = players.indexOf(player);
                    players.splice(index,1);
                    music.pause(); 
                    this.utenaDeathsound = new Audio('sounds/WalkingAwaySound.wav');
                    this.utenaDeathsound.play();
                    this.utenaDeathsound.volume = 0.7; 
                }
            }
            else {
                player.draw(ctx); 
            }
        });

        car.draw(ctx);
        playerBulletController.draw(ctx); 
        akioBulletController.draw(ctx);  
    }    
}

function displayGameOver(){
    if (isGameOver) {
        if(didWin) {
            let anthyutena = new Image();
            anthyutena.src = "images/anthyutena.jpg";
            let x = 0;
            let y = canvas.height - canvas.height; 
            let width = canvas.width; 
            let height = 550;  
            ctx.drawImage(anthyutena, x, y, width, height);
        }
        else {
            let anthywalksaway = new Image();
            anthywalksaway.src = "images/anthywalksaway.png";
            let x =  0;
            let y = canvas.height - canvas.height; 
            let width = canvas.width; 
            let height = 580; 
            ctx.drawImage(anthywalksaway, x, y, width, height);
        }
      }
}

function checkGameOver(){
    if(isGameOver) {
        return;
    }

    if(players.length == 0) {
        isGameOver = true;
    }

    if(akios.length == 0) {
        didWin = true;
        isGameOver = true; 
    }
}

setInterval(duel, 1000/60);