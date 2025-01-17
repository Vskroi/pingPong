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
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

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
    }, 10)
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
    if(Math.round(Math.random()) == 1){
        ballXDirection =  1; 
    }
    else{
        ballXDirection = -1; 
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection = Math.random() * 1;
    }
    else{
        ballYDirection = Math.random() * -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
}

function moveBall() {
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
}

function drawBall(ballX, ballY) {
    const ballGradient = ctx.createRadialGradient(ballX, ballY, 0, ballX, ballY, ballRadius);
    ballGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    ballGradient.addColorStop(1, 'rgba(255, 165, 0, 1)');
    
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = ballGradient;
    ctx.fill();
    
    ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
    ctx.shadowBlur = 20;
    
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = ballGradient;
    ctx.fill();
    
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
}

function checkCollision() {
    if(ballY <= 0 + ballRadius){
        ballYDirection *= -1;
    }
    if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1;
    }
    if(ballX <= 0){
        player2Score += 1;
        updateScore();
        createBall();
        increaseBallSpeed();
        return;
    }
    if(ballX >= gameWidth){
        player1Score += 1;
        updateScore();
        createBall();
        increaseBallSpeed();
        return;
    }
    if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
            ballX = (paddle1.x + paddle1.width) + ballRadius;
            ballXDirection *= -1;
        }
    }
    if(ballX >= (paddle2.x - ballRadius)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballX = paddle2.x - ballRadius;
            ballXDirection *= -1;
        }
    }
}

function increaseBallSpeed() {
    ballSpeed += 2;
    if (ballSpeed > 15) {
        ballSpeed = 15;
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keyPressed){
        case(paddle1Up):
            if(paddle1.y > 0){
                paddle1.y -= paddleSpeed;
            }
            break;
        case(paddle1Down):
            if(paddle1.y < gameHeight - paddle1.height){
                paddle1.y += paddleSpeed;
            }
            break;
        case(paddle2Up):
            if(paddle2.y > 0){
                paddle2.y -= paddleSpeed;
            }
            break;
        case(paddle2Down):
            if(paddle2.y < gameHeight - paddle2.height){
                paddle2.y += paddleSpeed;
            }
            break;
    }
}

function updateScore() {
    scoreText.textContent = `${player1Score} : ${player2Score}`;
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
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

  
function computerFunction() {
    document.getElementById("gameBoard").addEventListener('mousemove', (e) => {
      
        const mouseY = e.clientY;
        paddle1.y = mouseY;
    });

   
    setInterval(() => {
        if (ballY < paddle2.y + paddle2.height / 2) {
            paddle2.y -= 15; 
        } else if (ballY > paddle2.y + paddle2.height / 2) {
            paddle2.y += 15; 
        }
    }, 100);
}