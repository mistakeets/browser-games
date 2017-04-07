const blankSpace = 0,
  X = 1,
  O = -1

let mouse = {
  x: -1,
  y: -1
}

const cellSize = 150
let currentPlayer = X
let gameOver = false

let canvas = document.getElementById('tictactoe')
let ctx = canvas.getContext('2d')
let msg = document.getElementById('message')

let gameBoardValues = [0, 0, 0, 0, 0, 0, 0, 0, 0]

let winPatterns = [
  0b111000000, 0b000111000, 0b000000111,
  0b100100100, 0b010010010, 0b001001001,
  0b100010001, 0b001010100
]

canvas.width = canvas.height = 3 * cellSize

canvas.addEventListener('mouseout', function() {
  mouse.x = mouse.y = -1
})

canvas.addEventListener('click', function(event) {
  let x = event.pageX - canvas.offsetLeft
  let y = event.pageY - canvas.offsetTop

  mouse.x = x
  mouse.y = y

  playGame(mouseWhichCell(mouse.x, mouse.y))
})

function displayTurn() {
  msg.textContent = ((currentPlayer === X) ? 'X' : 'O') + '\'s turn'
}

function playGame(cell) {
  if (gameOver) {
    return
  }

  if (gameBoardValues[cell] != blankSpace) {
    msg.textContent = 'Illegal Move'
    return
  }

  gameBoardValues[cell] = currentPlayer

  let theWinner = checkWinner(currentPlayer)

  if (theWinner != 0) {
    gameOver = true
    msg.textContent = 'Player ' + ((currentPlayer === X) ? 'X' : 'O') + ' wins!!'
    return
  } else if (gameBoardValues.indexOf(blankSpace) === -1) {
    gameOver = true
    msg.textContent = 'It\'s a draw!'
    return
  }

  currentPlayer *= -1
  displayTurn()
}

function checkWinner(player) {
  let playerMoveBitShift = 0
  for (let k = 0; k < gameBoardValues.length; k++) {
    playerMoveBitShift <<= 1
    if (gameBoardValues[k] === player) {
      playerMoveBitShift += 1
    }
  }

  for (let k = 0; k < winPatterns.length; k++) {
    if ((playerMoveBitShift & winPatterns[k]) === winPatterns[k]) {
      return winPatterns[k]
    }
  }

  return 0
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  renderGameBoard()
  renderGamePiece()

  function renderGameBoard() {
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 10

    ctx.beginPath()
    ctx.moveTo(cellSize, 0)
    ctx.lineTo(cellSize, canvas.height)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(cellSize * 2, 0)
    ctx.lineTo(cellSize * 2, canvas.height)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, cellSize)
    ctx.lineTo(canvas.width, cellSize)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, cellSize * 2)
    ctx.lineTo(canvas.width, cellSize * 2)
    ctx.stroke()
  }

  function renderGamePiece() {
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 4
    for (let k = 0; k < gameBoardValues.length; k++) {
      let location = getCellLocation(k)

      ctx.save()
      ctx.translate(location.x + cellSize / 2, location.y + cellSize / 2)
      if (gameBoardValues[k] === 1) {
        drawX()
      } else if (gameBoardValues[k] === -1) {
        drawO()
      }
      ctx.restore()
    }
  }

  function drawX() {
    ctx.beginPath()
    ctx.moveTo(-cellSize / 3, -cellSize / 3)
    ctx.lineTo(cellSize / 3, cellSize / 3)
    ctx.moveTo(cellSize / 3, -cellSize / 3)
    ctx.lineTo(-cellSize / 3, cellSize / 3)
    ctx.stroke()
  }

  function drawO() {
    ctx.beginPath()
    ctx.arc(0, 0, cellSize / 3, 0, Math.PI * 2)
    ctx.stroke()
  }

  requestAnimationFrame(render)
}

function getCellLocation(cell) {
  let x = (cell % 3) * cellSize
  let y = Math.floor(cell / 3) * cellSize

  return {
    'x': x,
    'y': y,
  }
}

function mouseWhichCell(x, y) {
  return (Math.floor(x / cellSize) % 3) + Math.floor(y / cellSize) * 3
}

render()
