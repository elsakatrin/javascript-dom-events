console.log ("hello");



const texts = ['This game', 'Snake!']; //texts I wanted to use in header 
let count = 0; //keeps track on how many words there are 
let index = 0; //keeps track of induvitual letter 
let currentText = ''; //Text that's currently selected - that changes 
let letter = ''; //Induvitual letter - that changes 

(function type (){
    if(count === texts.length){ //this one counts the words (two words in this case)
    count = 0; //after they have counted to two I don't want it to keep coutning so I reset it back to the first one  
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index); //This helps us to get one letter at a time
    
    //The querySelector method is used to access one or more elements from the dom that maches one or more CSS selectors
    document.querySelector('.typing').textContent = letter;
    if(letter.length == currentText.length){
        count++;
        index = 0;
    }
    setTimeout(type, 300); //Runs every 300ms - how fast the letters appear 
    
}()); //self-invoked function - when ever it gets read it gets invoked at the same time 




//board size

let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;
 
//snake head size

let snakeX = blockSize * 5;
let snakeY = blockSize * 5; 

//snake speed 
let velocityX = 0;
let velocityY = 0;

//Snake body array
let snakeBody = [];

//Food for snake
let foodX; 
let foodY; 
//Game Over 
let gameOver = false;


//Board
window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on board


    placeFood();
    document.addEventListener("keyup", changeDirection);
    
    setInterval(update, 1000/10); //the game updates every 100 milliseconds 
    //the game needs to be updated so often because the game is always redrawing the canvas - to show the snake moving 
}

function update () {
    if (gameOver) {
        return;
    }
    context.fillStyle="black"; //Color of board
    context.fillRect(0, 0, board.width, board.height);  //fill rectangle

    context.fillStyle = "red"; //Color of food
    context.fillRect(foodX, foodY, blockSize, blockSize)//X and Y coardinates for food, witdh and height 
    //The reason the food is above the snake here is so the food appears over the snake when they collide 

    //Makes the snake eat food
    if (snakeX == foodX && snakeY == foodY) { //makes the snake eat food and it reappears in a new place
        snakeBody.push([foodX, foodY]) //makes snake grow bigger when eating
        placeFood();
    }


    //To make snake get longer when he eats, otherwise the snake leaves green columns behind when he eats
    //This makes the tail/body 
    for (let i = snakeBody.length-1; i > 0; i--) { 
    snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
    }

   //Food
    context.fillStyle = "red"; //Color of food
    context.fillRect(foodX, foodY, blockSize, blockSize)//X and Y coardinates for food, witdh and height 


    //Snake
    context.fillStyle = "lime"; //Color of snake
    snakeX += velocityX * blockSize //If I would't put blocksize here the snake would move very slowly because it's moving 1px every 100ms - when I say * blockSize it's moving one squere over every 100ms
    snakeY += velocityY * blockSize //I could put /2 here to make the snake move slowlyer but then it also moves in half blocks so it's even harder to aim for the food 
    context.fillRect(snakeX, snakeY, blockSize, blockSize) //X and Y coardinates for snake, witdh and height 
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize); 
    
 

    //game over conditions - everytime snake gets out of bounds or eats itself 
    if (snakeX < i || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) { //each time when snake is out of bounds/crashes into wall 
        gameOver = true;
        alert("Game Over"); //popup alert (sorry those that find it irritating haha!)
        return;
    }
   
       if (snakeX == snakeBody [i][0] && snakeY == snakeBody [i][1]) { //each time the snake eats it's self/collides with its body
        gameOver = true;
        alert("Game over");
        return;
       }
        
    
} 

}

//here's a funtion that places the snake food at random places every time the page is refreshed 
//Math.random returns a number between 0-1. We're multiplying it with collomns/rows(20) so it's more like a number between 0-19,99
//Math.floor get's rid of the ,99 so it's 0-19
function placeFood () {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}



//How keys change the direction of the snake 
//got into trouble here because it wouldnt move 
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) { //The && are put here with velocity so the snake should not move in the oposite direction that he's going in so he doesn't eat himself
        velocityX = 0; //these numbers represent which direction the snake moves on the x and y axis 
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}





//Button that changes text when it's clicked
const btn = document.getElementById('btn');

btn.addEventListener('click', function handleClick() {
    btn.innerHTML = 'I love snake!' ;
});