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
const players = [new Player(canvas, 3, 200, playerBulletController)];
const akios = [new Akio(canvas, 3, 200, akioBulletController)]; 

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
                    this.utenaDeathsound = new Audio('sounds/UtenaSound.wav');
                    this.utenaDeathsound.play();
                    this.utenaDeathsound.volume = 0.5; 
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

        if(!didWin) {
            let utenaandanthy = new Image();
            utenaandanthy.src = "images/utenaandanthy.png";
            let x =  200  ;
            let y = canvas.height - 550; 
            let width = 400; 
            let height = 600; 
            ctx.drawImage(utenaandanthy, x, y, width, height);
        }
        
        if(didWin) {
            let stab = new Image();
            stab.src = "images/stab.png";
            let x =  10  ;
            let y = canvas.height - 523; 
            let width = 780; 
            let height = 523; 
            ctx.drawImage(stab, x, y, width, height);
        }
        else {
            let anthandchu = new Image();
            anthandchu.src = "images/anthandchu.png";
            let x =  0;
            let y = canvas.height - 250; 
            let width = 250; 
            let height = 250; 
            ctx.drawImage(anthandchu, x, y, width, height);
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