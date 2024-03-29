
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterEaterCountElement = document.getElementById('grassEaterEaterCount');
    let grassAryusCountElement = document.getElementById('grassAryusCount');
    let grassVishapCountElement = document.getElementById('grassVishapCount');
    let seasonElement = document.getElementById('season');


    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        grassEaterEaterCountElement.innerText = data.grassEaterEaterCounter;
        grassAryusCountElement.innerText = data.grassAryusCounter;
        grassVishapCountElement.innerText = data.grassVishapCounter;
        currentSeason = data.eghanak;
        seasonElement.innerText = data.eghanak;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side + 1, matrix.length * side + 1)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if(currentSeason == "Ձմեռ"||currentSeason == "Աշուն"){
                        fill("white");
                    }
                    else if(currentSeason == "Գարուն"||currentSeason == "Ամառ"){
                        fill("green");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    if(currentSeason == "Ձմեռ"||currentSeason == "Աշուն"){
                        fill('black');
                    }
                    else if(currentSeason == "Գարուն"||currentSeason == "Ամառ"){
                        fill('red');
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('orange');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}