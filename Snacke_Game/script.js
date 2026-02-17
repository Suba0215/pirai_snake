const gameboard= document.getElementById('gameboard');
const context = gameboard.getContext('2d');
const scoretext= document.getElementById('scoreVal')

const WIDTH=gameboard.width;
const HEIGHT=gameboard.height;
const UNIT=25

//X and Y axis for displaying food
let foodX;
let foodY;
//X and Y axis for Snake Moments
let xVel=25;
let yVel=0;

score=0;
let active= true;
let started= false;

//Snake structure
let snake =[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
]

window.addEventListener('keydown', keypress);

startGame();

function startGame(){
    context.fillStyle ='black';
    //fillRect(Xstart,Ystart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    displayFood();
    drawsnake();
}


function keypress(event){
    if(!started){
        started=true;
        nexttick();
    }
    const LEFT=37;
    const UP=38;
    const RIGHT=39;
    const DOWN=40;

    switch(true){
        case(event.keyCode==LEFT && xVel!=UNIT):
            xVel=-UNIT;
            yVel=0;
            break;
        case(event.keyCode==RIGHT && xVel!= -UNIT):
            xVel=UNIT;
            yVel=0;
            break;
        case(event.keyCode==UP && yVel!= UNIT):
            xVel=0;
            yVel=-UNIT;
            break;
        case(event.keyCode==DOWN && yVel!= -UNIT):
            xVel=0;
            yVel=UNIT;
            break;
    }
}



function clearboard(){
    context.fillStyle ='black';
    //fillRect(Xstart,Ystart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
}


function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}


function displayFood(){
    context.fillStyle='red';
    context.fillRect(foodX,foodY,UNIT,UNIT);
}


function drawsnake(){
    context.fillStyle='aqua';
    context.strokeStyle='black';
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT);
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT);
    })
}


function movesnake(){
    //X axis : value , Y axis : value
    const head={x:snake[0].x+xVel , y:snake[0].y+yVel};
    // unshift for adding at the starting, pop is used for remove last element
    snake.unshift(head);
    if(snake[0].x==foodX && snake[0].y==foodY){
        score += 1;
        scoretext.textContent=score;
        createFood();
    }
    else{
    snake.pop();
    }
}


function nexttick(){
    if(active){
        setTimeout(()=>{
            clearboard();
            displayFood();
            drawsnake();
            movesnake();  
            checkGameover()    
            nexttick();
        },200);
    }
    else{
        clearboard();
        context.font="bold 50px serif"
        context.fillStyle="white"
        context.textAlign="center";
        context.fillText("Game Over⚠️",WIDTH/2,HEIGHT/2);
    }
}


function checkGameover(){
    switch(true){
         case(snake[0].x<0):
         case(snake[0].x>=WIDTH):
         case(snake[0].y<0):
         case(snake[0].y>=HEIGHT):
             active=false;
             break;
    }
}