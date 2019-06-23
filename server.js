
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var GrassEaterEater = require("./modules/GrassEaterEater.js");
var GrassAryus = require("./modules/GrassAryus.js");
var GrassVishap = require("./modules/GrassVishap.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
grassEaterEaterArr = [];
grassAryusArr = [];
grassVishapArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
grassEaterEaterHashiv = 0;
grassAryusHashiv = 0;
grassVishapHashiv = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, grassEaterEater, grassAryus, grassVishap) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < grassAryus; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < grassVishap; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 20, 10, 6, 4, 2);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            }else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }else if (matrix[y][x] == 3) {
                var grassEaterEater = new GrassEaterEater(x, y);
                grassEaterEaterArr.push(grassEaterEater);
                grassEaterEaterHashiv++;
            }else if (matrix[y][x] == 4) {
                var grassAryus = new GrassAryus(x, y);
                grassAryusArr.push(grassAryus);
                grassAryusHashiv++;
            }else if (matrix[y][x] == 5) {
                var grassVishap = new GrassVishap(x, y);
                grassVishapArr.push(grassVishap);
                grassVishapHashiv++;
            }
        }
    }
}
creatingObjects();
let day = 0
let season = "Ձմեռ"
function game() {
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        grassEaterEaterCounter: grassEaterEaterHashiv,
        grassAryusCounter: grassAryusHashiv,
        grassVishapCounter: grassVishapHashiv,
        eghanak: season
    }
day++;
if(day >0 && day <=12){
    sendData.eghanak = "Ձմեռ"
}
else if(day >12 && day <=24){
    sendData.eghanak = "Գարուն"
}
else if(day >=24 && day <48){
    sendData.eghanak = "Ամառ"
}
else if(day >=48 && day <72){
    sendData.eghanak = "Աշուն"
}
else{
    day = 0
}

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (grassEaterEaterArr[0] !== undefined) {
        for (var i in grassEaterEaterArr) {
            grassEaterEaterArr[i].eat();
        }
    }
    if (grassAryusArr[0] !== undefined) {
        for (var i in grassAryusArr) {
            grassAryusArr[i].eat();
        }
    }
    if (grassVishapArr[0] !== undefined) {
        for (var i in grassVishapArr) {
            grassVishapArr[i].eat();
        }
    }
    //! Object to send
    


    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}




setInterval(game, 1000)