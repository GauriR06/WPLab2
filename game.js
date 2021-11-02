var bear;
var bees;
var nbBees;
var game_start=false;
var lastStingTime;
var updateTimer=false;

function Bear() {
    this.dBear=100;
    //this.dBear = document.getElementById("dBear").value;
    this.htmlElement = document.getElementById("bear");
    this.id = this.htmlElement.id;
    this.x = this.htmlElement.offsetLeft;
    this.y = this.htmlElement.offsetTop;


    this.move = function(xDir, yDir) {
        this.fitBounds(); //we add this instruction to keep bear within board
        this.x += this.dBear * xDir;
        this.y += this.dBear * yDir;
        this.display();
    };

    this.display = function() {
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
        this.htmlElement.style.display = "block";
    };

    this.fitBounds = function() {
        let parent = this.htmlElement.parentElement;
        let iw = this.htmlElement.offsetWidth;
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;
        if (this.x < 0) this.x = 0;
        if (this.x > w - iw) this.x = w - iw;
        if (this.y < 0) this.y = 0;
        if (this.y > h - ih) this.y = h - ih;
        };

}
   
//changes speed of bear
function setspeed(){
    bear.dBear = document.getElementById("dBear").value;
    //console.log(bear.dBear);
    
}  

// Handle keyboad events 
// to move the bear

function moveBear(e) {
    if (game_start==false){
        game_start=true;
        while(isNaN(document.getElementById("duration").innerHTML)){
            document.getElementById("duration").innerHTML=0;
            document.getElementById("hits").innerHTML=0;
            
        }
        lastStingTime = new Date();
    }

    //codes of the four keys
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;
    if (e.keyCode == KEYRIGHT) {
        bear.move(1, 0)
    } // right key
    if (e.keyCode == KEYLEFT) {
        bear.move(-1, 0)
    } // left key
    if (e.keyCode == KEYUP) {
        bear.move(0, -1)
    } // up key
    if (e.keyCode == KEYDOWN) {
        bear.move(0, 1)
    } // down key
}

function start() {
    //create bear
    bear = new Bear();
    
    // Add an event listener to the keypress event.
    document.addEventListener("keydown", moveBear, false);

    document.addEventListener("keydown", change,false);

    //create new array for bees
    bees = new Array();

    //create bees
    makeBees();

    updateBees()  

    //lastStingtime= document.addEventListener("keydown", moveBear, true); 
    //lastStingTime= new Date();

}

function change(){
    lastStingTime= new Date();
    document.removeEventListener("keydown", change,false);
}

class Bee {
    constructor(beeNumber) {
        //the HTML element corresponding to the IMG of the bee
        this.htmlElement = createBeeImg(beeNumber);
        //iits HTML ID
        this.id = this.htmlElement.id;
        //the left position (x)
        this.x = this.htmlElement.offsetLeft;
        //the top position (y)
        this.y = this.htmlElement.offsetTop;
        this.move = function(dx, dy) {
            //move the bees by dx, dy
            this.x += dx;
            this.y += dy;
            this.display();
        };

        this.display = function() {
            //adjust position of bee and display it
            this.fitBounds();//add this to adjust to bounds
            this.htmlElement.style.left = this.x + "px";
            this.htmlElement.style.top = this.y + "px";
            this.htmlElement.style.display = "block";
        };
        this.fitBounds = function() {
            //check and make sure the bees stays in the board space
            let parent = this.htmlElement.parentElement;
            let iw = this.htmlElement.offsetWidth;
            let ih = this.htmlElement.offsetHeight;
            let l = parent.offsetLeft;
            let t = parent.offsetTop;
            let w = parent.offsetWidth;
            let h = parent.offsetHeight;
            if (this.x < 0)
                this.x = 0;
            if (this.x > w - iw)
                this.x = w - iw;
            if (this.y < 0)
                this.y = 0;
            if (this.y > h - ih)
                this.y = h - ih;
        };
    }
}

function createBeeImg(wNum) {
    //get dimension and position of board div
    let boardDiv = document.getElementById("board");
    let boardDivW = boardDiv.offsetWidth;
    let boardDivH = boardDiv.offsetHeight;
    let boardDivX = boardDiv.offsetLeft;
    let boardDivY = boardDiv.offsetTop;
    //create the IMG element
    let img = document.createElement("img");
    img.setAttribute("src", "https://raw.githubusercontent.com/hbatatia/lab02-dom-resources/main/images/bee.gif");
    img.setAttribute("width", "50");
    img.setAttribute("alt", "A bee!");
    img.setAttribute("id", "bee" + wNum);
    img.setAttribute("class", "bee"); //set class of html tag img
    //add the IMG element to the DOM as a child of the board div
    img.style.position = "absolute";
    boardDiv.appendChild(img);
    //set initial position 
    let x = getRandomInt(boardDivW);
    let y = getRandomInt(boardDivH);
    img.style.left = (boardDivX + x) + "px";
    img.style.top = (y) + "px";
    //return the img object
    return img;
}   

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function makeBees() {
    reset()
    //get number of bees specified by the user
    let nbBees = document.getElementById("nbBees").value;
    let nBees = Number(nbBees); //try converting the content of the input to a number 
    if (isNaN(nBees)) { //check that the input field contains a valid number
        window.alert("Invalid number of bees");
        return;
    }
    else{
        //create bees 
        let i = 1;
        while (i <= nBees) {
            var num = i;
            var bee = new Bee(num); //create object and its IMG element
            bee.display(); //display the bee
            bees.push(bee); //add the bee object to the bees array
            i++;
        }
    }
    
    
}

function reset(){
    while(bees.length>0){
        bees[bees.length -1].htmlElement.remove();
        bees.pop();
    }
}

function addBees(){
    var num = 1;
    var bee = new Bee(num); //create object and its IMG element
    bee.display(); //display the bee
    bees.push(bee); //add the bee object to the bees array

    //incrementing the value of bees in the input box
    let num_bees = document.getElementById("nbBees").value.innerHTML;
    num_bees = Number(num_bees) + 1; //increment the bees
    num_bees.innerHTML = num_bees; //display the new bees
}
   
function moveBees() {
    //get speed input field value
    let speed = document.getElementById("speedBees").value;
    //move each bee to a random location
    for (let i = 0; i < bees.length; i++) {
        let dx = getRandomInt(2 * speed) - speed;
        let dy = getRandomInt(2 * speed) - speed;
        bees[i].move(dx, dy);
        isHit(bees[i], bear); //we add this to count stings  
    }
}

function updateBees() { // update loop for game
    //move the bees randomly
    moveBees();
    //use a fixed update period
    
    let period = document.getElementById("periodTimer").value;//modify this to control refresh period 
    //update the timer for the next move
    updateTimer = setTimeout('updateBees()', period);

}

function clearTimeout(){
    while (true){
        updateTimer =setTimeout('updateBees()', 0);
    }
    
}

function isHit(defender, offender) {
    
    if (overlap(defender, offender)) { //check if the two image overlap
        let score = document.getElementById("hits").innerHTML;
        /*
        if(isNaN(document.getElementById("duration").innerHTML)){
            document.getElementById("duration").innerHTML=0;
            document.getElementById("hits").innerHTML=0;
            
        }
        */
        score = Number(score) + 1; //increment the score
        hits.innerHTML = score; //display the new score

        if(score==1000){
            window.alert("Game Over!");
            clearTimeout();

        }

        //calculate longest duration
        let newStingTime = new Date();
        let thisDuration = newStingTime - lastStingTime;
        lastStingTime = newStingTime;

        let longestDuration = Number(duration.innerHTML);
        if (longestDuration === 0) {
            longestDuration = thisDuration;
        } else {
        if (longestDuration < thisDuration) longestDuration = thisDuration;
        }
        document.getElementById("duration").innerHTML = longestDuration;
    
    }
}


function overlap(element1, element2) {
    //consider the two rectangles wrapping the two elements
    //rectangle of the first element
    left1 = element1.htmlElement.offsetLeft; 
    top1 = element1.htmlElement.offsetTop; 
    right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth; 
    bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight; 
    //rectangle of the second element
    left2 = element2.htmlElement.offsetLeft; //e2x
    top2 = element2.htmlElement.offsetTop; //e2y
    right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
    bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight; 
    //calculate the intersection of the two rectangles
    x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
    y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
    intersectArea = x_intersect * y_intersect;
    //if intersection is nil no hit
    if (intersectArea == 0 || isNaN(intersectArea)) {
        return false;
    }
    return true;
}
   

    