const gameContainer = document.getElementById("gameContainer")

const canvas = document.createElement('canvas')

canvas.height = 500
canvas.width = 1000
canvas.id = "gameBoard"

const boardBackground = "blcak";

gameContainer.appendChild(canvas)
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
  }
