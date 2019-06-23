var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class GrassAryus extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 12;
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
            grassAryusHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let grassAryus = new GrassAryus(x, y);
            grassAryusArr.push(grassAryus);
            this.life = 12;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(3);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life+=2;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterEaterArr) {
                if (grassEaterEaterArr[i].x == x && grassEaterEaterArr[i].y == y) {
                    grassEaterEaterArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 14) {
                this.mul();
            }
        }
        else {
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
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }else{
            let emptyCells = this.chooseCell(1);
            let newCell = random(emptyCells);
            if (newCell) {
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 4;
                matrix[this.y][this.x] = 1;
                this.y = y;
                this.x = x;
            }
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in grassAryusArr) {
            if (grassAryusArr[i].x == this.x && grassAryusArr[i].y == this.y) {
                grassAryusArr.splice(i, 1)
            }
        }
    }
}