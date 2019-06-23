var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class GrassVishap extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 14;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            grassVishapHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let grassVishap = new GrassVishap(x, y);
            grassVishapArr.push(grassVishap);
            this.life = 14;
        }
    }
    eat() {
        var a = random(5);
        if(a==1 || a==3){
            let emptyCells = this.chooseCell(4);
            let newCell = random(emptyCells);
            if (newCell) {

                this.life+=2;
                let x = newCell[0];
                let y = newCell[1];

                matrix[y][x] = 4;
                matrix[this.y][this.x] = 0;

                for (let i in grassAryusArr) {
                    if (grassAryusArr[i].x == x && grassAryusArr[i].y == y) {
                        grassAryusArr.splice(i, 1)
                    }
                }
                this.x = x;
                this.y = y;

                if (this.life >= 20) {
                    this.mul();
                }
            }
        }
        else if(a==2){
            let emptyCells = this.chooseCell(1);
            let newCell = random(emptyCells);
            if(newCell){
            
                this.life+=2;
                let x = newCell[0];
                let y = newCell[1];

                matrix[y][x] = 4;
                matrix[this.y][this.x] = 0;

                for (let i in grassAryusArr) {
                    if (grassAryusArr[i].x == x && grassAryusArr[i].y == y) {
                        grassAryusArr.splice(i, 1)
                    }
                }
                this.x = x;
                this.y = y;
            }
            if (this.life >= 20) {
                this.mul();
            }
        }
        else{
            this.move()
        }
        
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in grassVishapArr) {
            if (grassVishapArr[i].x == this.x && grassVishapArr[i].y == this.y) {
                grassVishapArr.splice(i, 1)
            }
        }
    }
}