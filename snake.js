var canvas = document.getElementById('gameScreen');
var ctx = canvas.getContext('2d');
var snake = [];

// controls for the game
var pressedDown = false;
var pressedUp  = false;
var pressedLeft = false;
var pressedRight = false;

// Game is being runned while true.
var runGame = true;
// FrameRate
const FRAME_RATE = 10;
// food initial coordinates
var foodx = 200;
var foody = 20;
var r = 0;

// Keeping score and High scor
var score = 0;
var ls = localStorage['tls'];
var hScore = ls;


var gameOverMenu = document.getElementById("gameOver");
var resetButton = document.querySelector('#restartButton');


document.addEventListener( 'keydown' , keyDownHandler);
resetButton.addEventListener('click', resetGame);


generateSnake();

function resetGame() {
	score = 0;
	runGame = true;
	gameOverMenu.style.visibility = "hidden";
	snake = [];
	pressedDown = false;
	pressedUp  = false;
	pressedLeft = false;
	pressedRight = false;
	generateSnake();
	startGame();

}

// Checking which button is pressed.
function keyDownHandler(e) {
	if (e.code == 'ArrowDown' && pressedUp == false) {
		pressedDown = true;
		pressedUp  = false;
		pressedLeft = false;
		pressedRight = false;
	} else if ( e.code == 'ArrowUp' && pressedDown == false) {
		pressedDown = false;
		pressedUp  = true;
		pressedLeft = false;
		pressedRight = false;
	} else if ( e.code == 'ArrowLeft' && pressedRight == false) {
		pressedDown = false;
		pressedUp  = false;
		pressedLeft = true;
		pressedRight = false;
	} else if ( e.code == 'ArrowRight' && pressedLeft == false) {
		pressedDown = false;
		pressedUp  = false;
		pressedLeft = false;
		pressedRight = true;
	}
}

function gameOver() {
	runGame = false;
	gameOverMenu.style.visibility = "visible";
	if (ls < hScore){
		localStorage['tls'] = hScore;
	}
}

function displayScore() {
	ctx.font = "20px Arial";
	ctx.fillStyle = 'white';
	ctx.fillText('Score : ' + score, 25,590);
	if (hScore < score){
		hScore = score;
	}
	ctx.fillText('High Score : ' + hScore, 425, 590)

}

function drawSnake(x,y){
	ctx.beginPath();
	//.rect( xposition, yposition, length, height);
	ctx.rect(x,y,20,20);
	ctx.stroke();
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.closePath();
}

function drawFood() {
	ctx.beginPath();
	//.rect( xposition, yposition, length, height);
	ctx.rect(foodx,foody,20,20);
	ctx.stroke();
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.closePath();
}

function generateSnake() {
	for (var i = 1; i >= 0; i--){
	//	drawSnake(i*20, 80);
		snake.push({x:i*20,y:20});
	}
}

function snakeUpdate() {
	// drawing the snake squares.
	for (var i = 0; i < snake.length; i++) {
		if ( i != 0 && ( snake[i].x == snake[0].x && snake[i].y == snake[0].y )) {
			gameOver();
		}
		drawSnake(snake[i].x, snake[i].y);
	}
}

function generateFoodPosition(){
	// Generating random coordinates for the food.
	if (snake[0].x == foodx && snake[0].y == foody) {
		foodx = Math.floor(Math.random() * 580);
		foodx = foodx - (foodx % 20);
		foody = Math.floor(Math.random() * 580);
		foody = foody - (foody % 20);
		score++;
	} else { // removing the last square of the snake 
		snake.pop();
	}
}

function snakeDirection() {
	if (pressedDown) {
		snake.unshift({x: snake[0].x, y : snake[0].y + 20})
	} else if (pressedLeft) {
		snake.unshift({x: snake[0].x - 20, y : snake[0].y});
	} else if (pressedRight) {
		snake.unshift({x: snake[0].x + 20, y : snake[0].y});
	} else if (pressedUp) {
		snake.unshift({x: snake[0].x, y : snake[0].y - 20});
	} else { // initial state of the snake until a key is pressed;
		snake.unshift({x: snake[0].x + 20, y: snake[0].y});
	}
}

function gameOverCondition() {
		// Displaying gameOver conditions
	if(snake[0].x < 0 || snake[0].x > canvas.width || snake[0].y < 0 || snake[0].y > canvas.height){
		gameOver();
	}
}

function gameLoop(){
	if ( ls == 'undefined' || ls == undefined) {
		ls = -1;
		hScore = 0;
	}
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawFood();
	snakeDirection();
	generateFoodPosition();
	snakeUpdate();
	gameOverCondition();
	displayScore();
} 



function startGame() {
	if (runGame) {
		gameLoop();
	}
}

setInterval(startGame, 1000/FRAME_RATE);
