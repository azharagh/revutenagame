import Car from "./car.js";
import MovingDirection from "./movingdirection.js";

export default class CarController {
    carMap = [
        [0, 2, 2, 2],
        [0, 1, 1, 1],
        [0, 2, 2, 2],
        [0, 1, 1, 1],
      ];

    carRows = [];

    currentDirection = MovingDirection.left; 
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 6;
    defaultYVelocity = 0;

    constructor (canvas) {
        //reference to canvas
        this.canvas = canvas;
        this.createCars();
    }

    draw(ctx) {
        this.drawCars(ctx);
        this.updateVelocityAndDirection();
    }


    drawCars(ctx) {
        //loop over all the car rows
        //make the 2d array into a flat one
        this.carRows.flat().forEach((car) => {
            car.move(this.xVelocity, this.yVelocity); 
            car.draw(ctx); 
        });
    }

    createCars() {
        //create cars inside of our car rows
        this.carMap.forEach((row, rowIndex) => {
            //add the same no. of rows in carMap to carRows then add an empty array for that row
            this.carRows[rowIndex] = [];
            //take a row which represents all the diff no.s for a particular row and map that to a list of car objects
            row.forEach((carNumber, carIndex) => {
                if(carNumber > 0) {
                    this.carRows[rowIndex].push(new Car(carIndex * 190, rowIndex * 140, carNumber));
                }
            });
        });
    }

    //every single time we draw, update velocity and direction of cars
    updateVelocityAndDirection() {
        //loop over car rows
        for(const carRow of this.carRows) {
            if(this.currentDirection == MovingDirection.left) {
                //cars moving left 
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;  

                const leftMostCar = carRow[0]; 
                if(leftMostCar.x <= 0 ) {
                    this.currentDirection = MovingDirection.right; 
                    break;
                }
            }
            //cars moving right
            else if(this.currentDirection == MovingDirection.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
              
                const rightMostCar = carRow[carRow.length - 1];
                if(rightMostCar.x + rightMostCar.width >= this.canvas.width) {
                    this.currentDirection = MovingDirection.left;
                }
            } 
        } 
    }
}