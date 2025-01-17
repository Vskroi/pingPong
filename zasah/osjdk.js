//====================================================================================================================

const computerButtom = document.createElement('button')
const player1VSplayer2 = document.createElement('button')
const refresh = document.createElement('button')
const reset = document.createElement('button')
const buttonsDiv = document.createElement('div')

buttonsDiv.style.display = 'flex'
buttonsDiv.style.gap = '20px'
reset.innerHTML = 'reset'
reset.id = 'resetBtn'
refresh.innerHTML = 'back'
refresh.id = 'resetBtn'
computerButtom.innerHTML = 'player VS computer'
computerButtom.id = 'botAndPlayer'
player1VSplayer2.id = 'botAndPlayer'
player1VSplayer2.innerHTML = 'player VS player'

document.getElementById('gameContainer').appendChild(buttonsDiv)
buttonsDiv.appendChild(player1VSplayer2)
buttonsDiv.appendChild(computerButtom)

player1VSplayer2.addEventListener('click', () => {
  buttonsDiv.appendChild(refresh)
  buttonsDiv.appendChild(reset)
  player1VSplayer2.id = 'hid'
  computerButtom.id = 'hid'
  player()
  computerButtom.disabled = true;
  refresh.addEventListener('click', () => {
    function reloadPage() {
      location.reload();
    } reloadPage()
  })
});
computerButtom.addEventListener('click', () => {
  buttonsDiv.appendChild(refresh)
  buttonsDiv.appendChild(reset)
  computerButtom.id = 'hid'
  player1VSplayer2.id = 'hid'
  bot()
  player1VSplayer2.disabled = true;
  /*   setTimeout(() => {
      computerFunction();
    }, 1000); */
  refresh.addEventListener('click', () => {
    function reloadPage() {
      location.reload();
    } reloadPage()
  })
});


//====================================================================================================================


function player (){


const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "black";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "blue"; // Ball color is now blue
const shadowColor = "red"; // Shadow color is now red
const ballRadius = 12.5;
let intervalID;
let ballSpeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddleMargin = 10;
let paddle1 = {

    width: 10,
    height: 100,
    x: paddleMargin,
    y: gameHeight / 2 - 50
};
let paddle2 = {
    width: 10,
    height: 100,
    x: gameWidth - paddleMargin -10,
    y: gameHeight / 2 - 50
};

/* window.addEventListener("keydown", changeDirection); */

// Trail array to store previous ball positions

let ballTrail = [];

window.addEventListener("keydown", changeDirection);

reset.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  createBall();
  nextTick();
}

function nextTick() {
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10);
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawPaddles() {
  ctx.strokeStyle = paddleBorder;
  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function createBall() {
    ballSpeed = 3;
    if (Math.round(Math.random()) == 1) {
        ballXDirection = 1;
    } else {
        ballXDirection = -1;
    }
    if (Math.round(Math.random()) == 1) {
        ballYDirection = Math.random() * 1;
    } else {
        ballYDirection = Math.random() * -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
}

function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}

function drawBall(ballX, ballY) {
     // Store current position in the trail array
  ballTrail.push({ x: ballX, y: ballY });
   // Limit trail length (remove the oldest trail)
  if (ballTrail.length > 20) {
    ballTrail.shift();
  }
 // Draw the trail behind the ball
  for (let i = 0; i < ballTrail.length; i++) {
    const trailAlpha = (i + 1) / ballTrail.length;// Calculate fading alpha
    ctx.fillStyle = `rgba(255, 0, 0, ${trailAlpha})`; // Red shadow effect with fading
    ctx.fillRect(
      ballTrail[i].x - ballRadius / 2,
      ballTrail[i].y - ballRadius / 2,
      ballRadius,
      ballRadius
    );// Draw the trail as a rectangle
  }
    // Draw the ball itself
  const ballGradient = ctx.createRadialGradient(
    ballX,
    ballY,
    0,
    ballX,
    ballY,
    ballRadius
  );
  ballGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  ballGradient.addColorStop(1, "rgba(0, 0, 255, 1)"); // Ball color gradient from white to blue

  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = ballGradient;
  ctx.fill();
}

function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection *= -1;
    playSound("bounceSound"); 
  }else if (ballY >= gameHeight - ballRadius) {
    ballYDirection *= -1;
    playSound("bounceSound"); 
  }else if((ballX<=0+ballRadius&&ballY>gameHeight-100&&ballY<gameHeight-ballRadius)){
    ballXDirection *= -1;
    playSound("bounceSound"); 
  }else if((ballX<=0+ballRadius&&ballY<100&&ballY>ballRadius)){
    ballXDirection *= -1;
    playSound("bounceSound"); 
  }else if((ballX>=gameWidth-ballRadius&&ballY>gameHeight-100&&ballY<gameHeight-ballRadius)){
    ballXDirection *=-1;
    playSound("bounceSound"); 
  }else if((ballX>=gameWidth-ballRadius&&ballY<100&&ballY>ballRadius)){
    ballXDirection *=-1;
    playSound("bounceSound"); 
  }
  if (ballX <= 0) {
    player2Score += 1;
    updateScore();
    createBall();
    increaseBallSpeed();
    playSound("scoreSound");  
    return;
  }
  if (ballX >= gameWidth) {
    player1Score += 1;
    updateScore();
    createBall();
    increaseBallSpeed();
    playSound("scoreSound");  
    return;
  }
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = paddle1.x + paddle1.width + ballRadius;
      ballXDirection *= -1;
      playSound("bounceSound"); 
    }
  }
  if (ballX >= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius;
      ballXDirection *= -1;
      playSound("bounceSound"); 
    }
  }
}

function increaseBallSpeed() {
  ballSpeed += 2;
  if (ballSpeed > 15) {
    ballSpeed = 15;
  }
}
let paddleSpeed = 8;
let paddle1SpeedY = 0;
let paddle2SpeedY = 0;

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case paddle1Up:
      paddle1SpeedY = -paddleSpeed;
      break;
    case paddle1Down:
      paddle1SpeedY = paddleSpeed;
      break;
    case paddle2Up:
      paddle2SpeedY = -paddleSpeed;
      break;
    case paddle2Down:
      paddle2SpeedY = paddleSpeed;
      break;
  }
}

function stopPaddleMovement(event) {
  const keyPressed = event.keyCode;
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case paddle1Up:
    case paddle1Down:
      paddle1SpeedY = 0;
      break;
    case paddle2Up:
    case paddle2Down:
      paddle2SpeedY = 0;
      break;
  }
}
function updatePaddlePosition(){
    
    if (paddle1.y + paddle1SpeedY >= 0 && paddle1.y + paddle1SpeedY <= gameHeight - paddle1.height) {
        paddle1.y += paddle1SpeedY;
    }
    if (paddle2.y + paddle2SpeedY >= 0 && paddle2.y + paddle2SpeedY <= gameHeight - paddle2.height) {
        paddle2.y += paddle2SpeedY;
    }

    requestAnimationFrame(updatePaddlePosition);
}

document.addEventListener('keydown', changeDirection);
document.addEventListener('keyup', stopPaddleMovement);

requestAnimationFrame(updatePaddlePosition);




function updatePaddlePosition() {
  if (
    paddle1.y + paddle1SpeedY >= 0 &&
    paddle1.y + paddle1SpeedY <= gameHeight - paddle1.height
  ) {
    paddle1.y += paddle1SpeedY;
  }
  if (
    paddle2.y + paddle2SpeedY >= 0 &&
    paddle2.y + paddle2SpeedY <= gameHeight - paddle2.height
  ) {
    paddle2.y += paddle2SpeedY;
  }

  requestAnimationFrame(updatePaddlePosition);
}

document.addEventListener("keydown", changeDirection);
document.addEventListener("keyup", stopPaddleMovement);

requestAnimationFrame(updatePaddlePosition);

function updateScore() {
  scoreText.textContent = `${player1Score} : ${player2Score}`;
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 10,
        height: 100,
        x: paddleMargin,
        y: gameHeight / 2 - 50
    };
    paddle2 = {
        width: 10,
        height: 100,
        x: gameWidth - paddleMargin - 10,
        y: gameHeight / 2 - 50
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
}

// sound

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;  // Дууг эхнээс нь дахин тоглуулах
    sound.play();
}
//=========================tttt
const computerButtom = document.createElement('button')
computerButtom.innerHTML = 'player VS computer'
computerButtom.id= 'computerButtom'
document.getElementById('gameContainer').appendChild(computerButtom)
const player1VSplayer2= document.createElement('button')
player1VSplayer2.id= 'player1VSplayer2'
player1VSplayer2.innerHTML = 'player VS player'
document.getElementById('gameContainer').appendChild(player1VSplayer2)
player1VSplayer2.addEventListener('click', () => {
    computerButtom.disabled = true;
    window.addEventListener("keydown", changeDirection);
  });
computerButtom.addEventListener('click', () => {
    player1VSplayer2.disabled = true;
    setTimeout(() => {
      computerFunction();
    }, 1000);});
}