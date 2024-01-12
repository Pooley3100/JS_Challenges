/*Branch always has two branches attached
* Recursive function that breaks at end of recursion
* translate within each function such to begin with 90 degree angle and then change
*/

//Will be double in implementation
const lineLength = 200;
const lineDecreaseBy = 0.70;

function setup(){
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    background(255);
    push()
    translate(windowWidth/2, windowHeight/2 + 300)
    line(0, 0, 0,  -lineLength);
    branch(lineLength * lineDecreaseBy, 4, 7);
    pop();
}

function branch(localLineLength, localRotation, recursiveNum){
    if(recursiveNum < 1){
        return;
    }
    push()
    // Move to top of line
    translate(0, -(localLineLength/lineDecreaseBy))

    // rotate to the left
    push()
    rotate(-(PI / localRotation));
    line(0, 0, 0,  - localLineLength);
    branch(localLineLength*lineDecreaseBy, localRotation * 2, recursiveNum-1)
    pop()

    // rotate to the right
    push()
    rotate((PI / localRotation));
    line(0, 0, 0,  - localLineLength);
    branch(localLineLength*lineDecreaseBy, localRotation * 2, recursiveNum-1)
    pop()

    pop()
}
