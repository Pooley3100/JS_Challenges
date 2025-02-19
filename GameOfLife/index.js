var canvasWidth = 400;
var canvasHeight = 400;
var squareSize = 14;
var constDecrease = 4;
var cellsMap = [];
var nextGenCells = [];
var rowW = 0;
var colH = 0;
var countPause = 0;

function cellsMapSetup(){
    rowW = Math.floor(canvasWidth / squareSize)
    colH = Math.floor(canvasHeight / squareSize)
    for(let i = 0; i<rowW; i+=1){
        let r = [];
        let r2 = [];
        for(let j = 0; j<colH; j+=1){
            r.push(0);
            r2.push(0);
        }
        nextGenCells.push(r2);
        cellsMap.push(r);
    }
}

function setup() { 
    angleMode(RADIANS);
    canvasWidth = windowWidth-constDecrease;
    canvasHeight = windowHeight-constDecrease;
    createCanvas(canvasWidth, canvasHeight);
    cellsMapSetup();
    background(100);
    frameRate(15);

    //Initial cool seed
    cellsMap[8][4] = 1
    cellsMap[8][5] = 1
    cellsMap[8][6] = 1
    cellsMap[9][6] = 1
    cellsMap[7][5] = 1
}

function windowResized() {
    cellsMapSetup();
    canvasWidth = windowWidth -constDecrease;
    canvasHeight = windowHeight -constDecrease;
    resizeCanvas(canvasWidth, canvasHeight);
}

function copyFromNextGen(){
    for(let i = 0; i<rowW; i+=1){
        for(let j = 0; j<colH; j+=1){
            cellsMap[i][j] = nextGenCells[i][j];
        }
    }
}

//The meat of it
function generation(){
    //Rule 1, any live cell with fewer than two live neighbours dies
    //Rule 2, any live cell with two or three live neighbours lives on to the next generation
    //Rule 3, any live cell with more than three live neighbours dies as if by overpopulation
    //Rule 4, any dead cell with exactly three live neighbours become a live cell
    for(let i = 0; i<rowW; i+=1){
        for(let j = 0; j<colH; j+=1){
            let neighboursAlive = 0
            if(cellsMap[i][j] == 1){
                console.log(`Cell: ${i} ${j} with neighbours alive: ${neighboursAlive}`)
            }
            if(i>0 && cellsMap[i-1][j] == 1){
                neighboursAlive+=1
            }
            if(i<rowW-1 && cellsMap[i+1][j] == 1){
                neighboursAlive+=1
            }
            if(j>0 && cellsMap[i][j-1] == 1){
                neighboursAlive+=1
            }
            if(j<colH-1 && cellsMap[i][j+1] == 1){
                neighboursAlive+=1
            }
            //Diagonals
            if(j<colH-1 && i>0 && cellsMap[i-1][j+1] == 1){
                neighboursAlive+=1
            }
            if(j>0 && i>0 && cellsMap[i-1][j-1] == 1){
                neighboursAlive+=1
            }
            if(j<colH-1 && i<rowW-1 && cellsMap[i+1][j+1] == 1){
                neighboursAlive+=1
            }
            if(j>0 && i<rowW-1 && cellsMap[i+1][j-1] == 1){
                neighboursAlive+=1
            }
            
            //Now the rules
            if(cellsMap[i][j] == 1){
                console.log(`Cell: ${i} ${j} with neighbours alive: ${neighboursAlive}`)
            }
            nextGenCells[i][j] = cellsMap[i][j]
            if(cellsMap[i][j] == 1){
                if(neighboursAlive < 2){
                    nextGenCells[i][j] = 0;
                }else if(neighboursAlive > 3){
                    nextGenCells[i][j] = 0;
                }
            } else if(neighboursAlive == 3){
                nextGenCells[i][j] = 1;
            }
        }
    }
    copyFromNextGen();
}

function drawGrid(){
    //Vertical Lines
    for(let i = 0; i<rowW; i+=1){
        line(i*squareSize, 0, i*squareSize, canvasHeight);
    }
    //Horizontal Lines
    for(let i = 0; i<colH; i+=1){
        line(0, i*squareSize, canvasWidth, i*squareSize);
    }

}

function mouseClicked(){
    let x = Math.floor(mouseX/squareSize)
    let y = Math.floor(mouseY/squareSize)
    cellsMap[x][y] = 1
}

function drawCells(){
    fill(1);
    for(let i = 0; i<rowW; i+=1){
        for(let j = 0; j<colH; j+=1){
            if(cellsMap[i][j] == 1){
                square(i*squareSize, j*squareSize, squareSize)
            }
        }
    }
}

function draw(){
    //cellsMap[8][4] == 1 ? cellsMap[8][4] = 0 : cellsMap[8][4] = 1
    
    background(250);
    drawGrid();
    if(countPause > 40){
        generation();
    }
    countPause+=1
    drawCells();
}