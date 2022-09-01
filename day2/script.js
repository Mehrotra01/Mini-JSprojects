var ball = document.getElementById("Ball");  //getting the ball
var gameBlock = document.getElementById("game"); // getting the whole block 
var movement; //variable to to move or i can say control the movement of the ball
var keyPress=0; 
var points=0;
var currentBlocks=[];

function moveLeft(){
    var left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if(left>0){
        ball.style.left = left - 2 + "px";
    }
}
function moveRight(){
    var left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if(left<373){
        ball.style.left = left + 2 + "px";
    }
}
document.addEventListener("keydown", event => {
    if(keyPress==0){
        keyPress++;
        if(event.key==="ArrowLeft"){
            movement = setInterval(moveLeft, 1);
        }
        if(event.key==="ArrowRight"){
            movement = setInterval(moveRight, 1);
        }
    }
});
document.addEventListener("keyup", event => {
    clearInterval(movement);
    keyPress=0;
});
// main function to make all the hurdels and make the game run
var hurdels = setInterval(function(){
    var lastHurdel = document.getElementById("hurdel"+(points-1));
    var lastHole = document.getElementById("hole"+(points-1));
    if(points>0){ //we need last hurdel and hole top to shift it up
        var lastHurdelTop = parseInt(window.getComputedStyle(lastHurdel).getPropertyValue("top"));
        var lastHoleTop = parseInt(window.getComputedStyle(lastHole).getPropertyValue("top"));
    }
    if(lastHurdelTop<400 || points==0 ){ //basic section executes when the game start 
    var hurdel = document.createElement("div");
    var hole = document.createElement("div");
    hurdel.setAttribute("class", "hurdel");
    hole.setAttribute("class", "hole");
    hurdel.setAttribute("id", "hurdel"+points);
    hole.setAttribute("id", "hole"+points);
    hurdel.style.top= lastHurdelTop + 100 + "px";
    hole.style.top= lastHoleTop + 100 + "px";
    var random = Math.floor(Math.random()*360);
    hole.style.left=random +"px";
    gameBlock.appendChild(hurdel);
    gameBlock.appendChild(hole);
    currentBlocks.push(points);
    points++;
    // console.log(currentBlocks)
}
// we always gonna need the wher the ball is so we will fetch the position of ball
var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"))
var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"))
var drop=0; //gameover 

// before everything we need to check that game is not over
if(ballTop<=0){

    alert("Game over . Score "+(points-9));
    clearInterval(hurdels);
    location.reload();
}

//the function that is gonna make everthing move and give our game its soul
    for (let i = 0; i < currentBlocks.length; i++) {
        let currentElement = currentBlocks[i];
        let ithHurdel = document.getElementById("hurdel"+currentElement);
        let ithHole = document.getElementById("hole"+currentElement);
        let topofhurdel=parseFloat(window.getComputedStyle(ithHurdel).getPropertyValue("top"));
        let leftofhole=parseFloat(window.getComputedStyle(ithHole).getPropertyValue("left"));
        ithHurdel.style.top= topofhurdel -0.65+"px";
        ithHole.style.top= topofhurdel -0.65+"px";
        if(topofhurdel< -20){ //animation at the top of the block
            currentBlocks.shift();
            ithHurdel.remove();
            ithHole.remove();
        }
        if(topofhurdel-20<ballTop && topofhurdel>ballTop ){
            drop++;
            if(leftofhole<=ballLeft && leftofhole+20>=ballLeft){
                drop=0;
            }
        }
    }
    if(drop==0){
        if(ballLeft<400){
            ball.style.top=ballTop+2+"px";
        }}else{
        ball.style.top=ballTop-0.5+"px";
        }
    

},1);