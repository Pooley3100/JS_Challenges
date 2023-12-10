var canvasWidth = 400;
var canvasHeight = 400;
var clock = 0;
var currentScore = 0;
const numAsteroids = 15;
const asteroidRadius = 15;
const rocketRadius = 40;
var asteroidSpeed = 5;
let asteroidImg, rocketImg;

var play = true;
var rocket = {
    xPos: canvasWidth / 2,
    yPos: canvasHeight / 2,
    xVel: 2,
    yVel: 2,
    xAcc: 0,
    yAcc: 0
};
var asteroids = [];

function setup() { 
    angleMode(RADIANS);
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth, canvasHeight);
    setupAsteroids();
    setInterval(clockCount, 1000);
}

function windowResized() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    resizeCanvas(canvasWidth, canvasHeight);
}

function preload(){
    asteroidImg = loadImage('assets/asteroid.png');
    rocketImg = loadImage('assets/rocket.png');
}

function setupAsteroids() {
    asteroidSpeed = 5;
    asteroids = [];  
    for (var i = 0; i < numAsteroids; i++) {
        asteroids.push({
            xPos: random(canvasWidth),
            yPos: 0,
            xVel: random(5, 10) * random(-1, 1),
            yVel: random(5, 10) * random(-1, 1)
        });
    }
    console.log(asteroids);
}

function draw() {
    background(10);
    if (play) {
        // Display Clock
        textAlign(RIGHT, TOP);
        fill(50, 200, 0);
        textSize(55);
        text(clock.toString(), canvasWidth - 5, 5);

        fill(255, 255, 255);
        //Move rockets and asteroids
        calcRocket();
        calcAsteroids();
        if (calcCollision() || calcAsteroidCollisions()) {
            play = false;
            setupAsteroids();
            currentScore = clock;
            clock = 0;
        };
        //circle(rocket.xPos, rocket.yPos, rocketRadius * 2);
        push();
        translate(rocket.xPos+rocketRadius, rocket.yPos+rocketRadius);
        rotate(getAngle() + (PI/2));
        image(rocketImg, -rocketRadius, -rocketRadius, rocketRadius*2, rocketRadius*2);
        pop();
        
    } else {
        textAlign(CENTER, CENTER);

        fill(50, 200, 0);
        textSize(55);
        text(`You Scored ${currentScore}`, canvasWidth / 2, 150)

        fill(255, 30, 0);
        textSize(65);
        text('Game Over', canvasWidth / 2, canvasHeight / 2);

        fill(255, 255, 255);
        textSize(45);
        text('Press Space to Restart', canvasWidth / 2, canvasHeight / 2 + 150);
    }
}

function getAngle(){
    // Put 2d grid at center of object.
    let x = mouseX - canvasWidth /2 ;
    let y = mouseY - canvasHeight / 2;
    var angle = atan2(y, x);
    console.log(angle);
    return angle;
}

function clockCount() {
    if (play) {
        clock += 1;
        fill(255, 255, 255);
        textSize(45);
        //Increase difficulty every 5 seconds.
        //Add more asteroids
        if (clock % 10 == 0) {
            for (var i = 0; i < 3; i++) {
                asteroids.push({
                    xPos: random(canvasWidth),
                    yPos: 0,
                    xVel: random(asteroidSpeed, asteroidSpeed+5) * random(-1, 1),
                    yVel: random(asteroidSpeed, asteroidSpeed+5) * random(-1, 1)
                });
            }
        //Else increase speed
        } else if(clock % 5 == 0){
            asteroidSpeed += 3;
        }
    }
}

function calcAsteroidCollisions() {
    var hitDist = rocketRadius + asteroidRadius;
    var hit = false;
    asteroids.forEach((a) => {
        if ((abs(a.xPos - rocket.xPos) <= hitDist) && (abs(a.yPos - rocket.yPos) <= hitDist)) {
            hit = true;
        }
    })
    return hit;
}

function calcAsteroids() {
    asteroids.forEach((a) => {
        a.xPos += a.xVel;
        a.yPos += a.yVel;
        if (a.xPos > canvasWidth || a.yPos > canvasHeight || a.xPos < 0 || a.yPos < 0) {
            a.xPos = random(canvasWidth);
            a.yPos = 0;
            a.xVel = random(asteroidSpeed, asteroidSpeed + 5) * random(-1, 1);
            a.yVel = random(asteroidSpeed, asteroidSpeed + 5) * random(-1, 1);
        }
        //circle(a.xPos, a.yPos, asteroidRadius * 2);
        image(asteroidImg, a.xPos, a.yPos, asteroidRadius*2, asteroidRadius*2);
    })
}

function keyPressed() {
    if (keyCode === 32 && play === false) {
        rocket.xPos = canvasWidth / 2;
        rocket.yPos = canvasHeight / 2,
            play = true;
    }
}

// Currently just walls
function calcCollision() {
    if (rocket.xPos > canvasWidth || rocket.xPos < 0 || rocket.yPos < 0 || rocket.yPos > canvasHeight) {
        return true;
    } else {
        return false;
    }
}

function calcRocket() {
    rocket.xAcc = map(mouseX - rocket.xPos, 0, windowWidth, 0, 2);
    rocket.yAcc = map(mouseY - rocket.yPos, 0, windowHeight, 0, 2);
    //console.log(`${rocket.xAcc} and ${rocket.yAcc}`)
    if (rocket.xVel <= 5 && rocket.xAcc > 0) {
        rocket.xVel += rocket.xAcc;
    }
    if (rocket.xVel >= -5 && rocket.xAcc < 0) {
        rocket.xVel += rocket.xAcc;
    }
    if (rocket.yVel <= 5 && rocket.yAcc > 0) {
        rocket.yVel += rocket.yAcc;
    }
    if (rocket.yVel >= -5 && rocket.yAcc < 0) {
        rocket.yVel += rocket.yAcc;
    }
    rocket.xPos += rocket.xVel;
    rocket.yPos += rocket.yVel;
}