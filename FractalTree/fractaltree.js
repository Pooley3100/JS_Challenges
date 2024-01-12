/*Branch always has two branches attached
* Recursive function that breaks at end of recursion
* translate within each function such to rotate branches degree angle
*/

//Will be double in implementation
const lineLength = 200;
//Closer to 1 means stays longer
const lineDecreaseBy = 0.72;
//Closer to 1 means stays wider apart longer
const rotationDecreaseBy = 1.380;
//Higher means more branches
const recursiveStart = 9
// Changes by multiplying by rotation decrease each recursion call.
const rotationStart = 4;

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
    branch(lineLength * lineDecreaseBy, rotationStart, recursiveStart);
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
    branch(localLineLength*lineDecreaseBy, localRotation * rotationDecreaseBy, recursiveNum-1)
    pop()

    // rotate to the right
    push()
    rotate((PI / localRotation));
    line(0, 0, 0,  - localLineLength);
    branch(localLineLength*lineDecreaseBy, localRotation * rotationDecreaseBy, recursiveNum-1)
    pop()

    pop()
}
