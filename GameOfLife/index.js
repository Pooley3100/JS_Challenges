var canvasWidth = 400;
var canvasHeight = 400;
//Stores offset from 0.0 (i.e. universe takes up 80% of screen)
const universeScale = 0.8;
var universeWidth = 0;
var universeHeight = 0;
const squareSize = 14;
var constDecrease = 4;
var cellsMap = [];
var nextGenCells = [];
var rowW = 0;
var colH = 0;
var countPause = 0;


function cellsMapSetup() {
    //Take up 80% of the screen 
    rowW = universeWidth / squareSize
    colH = universeHeight / squareSize
    for (let i = 0; i < rowW; i += 1) {
        let r = [];
        let r2 = [];
        for (let j = 0; j < colH; j += 1) {
            r.push(0);
            r2.push(0);
        }
        nextGenCells.push(r2);
        cellsMap.push(r);
    }
}

function setup() {
    angleMode(RADIANS);
    //Const decrease as canvas seen as slightly bigger then actual window
    canvasWidth = windowWidth - constDecrease;
    canvasHeight = windowHeight - constDecrease;
    universeWidth = Math.floor((canvasWidth * universeScale) / squareSize) * squareSize;
    universeHeight = Math.floor((canvasHeight * universeScale) / squareSize) * squareSize;
    createCanvas(canvasWidth, canvasHeight);
    cellsMapSetup();
    background(100);
    frameRate(15);
    textSize(35)
    textAlign(CENTER, CENTER);

    //Initial cool seed
    cellsMap[8][4] = 1
    cellsMap[8][5] = 1
    cellsMap[8][6] = 1
    cellsMap[9][6] = 1
    cellsMap[7][5] = 1
}

function windowResized() {
    canvasWidth = windowWidth - constDecrease;
    canvasHeight = windowHeight - constDecrease;
    universeWidth = Math.floor((canvasWidth * universeScale) / squareSize) * squareSize;
    universeHeight = Math.floor((canvasHeight * universeScale) / squareSize) * squareSize;
    cellsMapSetup();
    resizeCanvas(canvasWidth, canvasHeight);
}

function copyFromNextGen() {
    for (let i = 0; i < rowW; i += 1) {
        for (let j = 0; j < colH; j += 1) {
            cellsMap[i][j] = nextGenCells[i][j];
        }
    }
}

//The meat of it
function generation() {
    //Rule 1, any live cell with fewer than two live neighbours dies
    //Rule 2, any live cell with two or three live neighbours lives on to the next generation
    //Rule 3, any live cell with more than three live neighbours dies as if by overpopulation
    //Rule 4, any dead cell with exactly three live neighbours become a live cell
    for (let i = 0; i < rowW; i += 1) {
        for (let j = 0; j < colH; j += 1) {
            let neighboursAlive = 0;

            // Check all eight neighbors
            const neighbors = [
                [(i - 1 + rowW) % rowW, (j - 1 + colH) % colH],
                [(i - 1 + rowW) % rowW, j],
                [(i - 1 + rowW) % rowW, (j + 1) % colH],
                [i, (j - 1 + colH) % colH],
                [i, (j + 1) % colH],
                [(i + 1) % rowW, (j - 1 + colH) % colH],
                [(i + 1) % rowW, j],
                [(i + 1) % rowW, (j + 1) % colH]
            ];

            for (const [x, y] of neighbors) {
                if (cellsMap[x][y] == 1) {
                    neighboursAlive += 1;
                }
            }

            // Apply the rules of the game
            if (cellsMap[i][j] == 1) {
                if (neighboursAlive < 2 || neighboursAlive > 3) {
                    nextGenCells[i][j] = 0;
                } else {
                    nextGenCells[i][j] = 1;
                }
            } else {
                if (neighboursAlive == 3) {
                    nextGenCells[i][j] = 1;
                } else {
                    nextGenCells[i][j] = 0;
                }
            }
        }
    }
    copyFromNextGen();
}

function drawGrid() {
    //Vertical Lines
    for (let i = 0; i < rowW + 1; i += 1) {
        line(i * squareSize, 0, i * squareSize, universeHeight);
    }
    //Horizontal Lines
    for (let i = 0; i < colH + 1; i += 1) {
        line(0, i * squareSize, universeWidth, i * squareSize);
    }

}

function mouseClicked() {
    let x = Math.floor((mouseX - ((canvasWidth - universeWidth) / 2)) / squareSize);
    let y = Math.floor((mouseY - ((canvasHeight - universeHeight) / 2)) / squareSize);
    try {
        cellsMap[x][y] = 1
    } catch (err) {
        console.log("not clicked within canvas");
    }
}

function drawCells() {
    fill(1);
    for (let i = 0; i < rowW; i += 1) {
        for (let j = 0; j < colH; j += 1) {
            if (cellsMap[i][j] == 1) {
                square(i * squareSize, j * squareSize, squareSize)
            }
        }
    }
}

function draw() {
    //cellsMap[8][4] == 1 ? cellsMap[8][4] = 0 : cellsMap[8][4] = 1

    background(250);
    
    text("Conwy Game of Life", canvasWidth/2, 40);

    //Universe
    translate(canvasWidth * ((1 - universeScale) / 2), canvasHeight * ((1 - universeScale) / 2));
    drawGrid();
    if (countPause > 40) {
        generation();
    } else{
        text("Select Cells to Be Alive", canvasWidth/2, 10);
    }
    countPause += 1
    drawCells();
    translate(0, 0);
}