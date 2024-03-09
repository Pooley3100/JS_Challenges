const listToAdd = [3,21,7,16,46,12,98,73,51,1,11,32];
var tree = null;
const diameter = 50;
const radius = diameter/2;

function setup(){
    //Initilise Tree
    var rootNode = new Node(5);
    tree = new Tree(rootNode);

    //Add list
    for(var i = 0; i < listToAdd.length; i++){
        tree.addNode(listToAdd[i])
    }

    console.log(tree.root);

    createCanvas(windowWidth, windowHeight)
}

function draw(){
    //Display created Tree
    background(255);
    
    textSize(20);
    drawTree(tree.root, windowWidth/2, windowWidth/2, 30);
}

//Recursive algorithm for drawing nodes, node, width is x pos, dir is whether this is right: true or left: false, based on this add/minus widhtPos, depth is y
function drawTree(node, width, widthPos, depth){
    circle(width, depth, diameter);
    text(node.value,(width) - 7, depth)

    widthPos = widthPos / 2

    if(node.left != null){
        drawTree(node.left, width-widthPos, widthPos, depth + 70);
        //line connecting this node to next
        line(width-radius, depth, width-widthPos, depth+70-radius)
    }
    if(node.right != null){
        drawTree(node.right, width+widthPos, widthPos, depth + 70);
        //line connecting this node to next
        line(width+radius, depth, width+widthPos, depth+70-radius)

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Node {
    constructor(val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }
}

class Tree{
    constructor(rootNode){
        this.root = rootNode;
    }

    recursiveAdd(node, pos){
        if(node.value < pos.value){
            if(pos.left == null){
                pos.left = node;
            } else{
                this.recursiveAdd(node, pos.left);
            }
        }
        if(node.value > pos.value){
            if(pos.right == null){
                pos.right = node;
            } else{
                this.recursiveAdd(node, pos.right);
            }
        }
    }

    addNode(value) {
        var node = new Node(value);
        this.recursiveAdd(node, this.root)
    }
}