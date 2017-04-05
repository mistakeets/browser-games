const blankSpace = 0,
  X = 1,
  O = -1

const cellSize = 150
let canvas = document.getElementById('tictactoe')
let ctx = canvas.getContext('2d')
let msg = document.getElementById('message')

let gameBoardValues = [1, 0, 1, -1, 0, 0, 1, 0, -1]

let winPatterns = [
  0b111000000, 0b000111000, 0b000000111,
  0b100100100, 0b010010010, 0b001001001,
  0b100010001, 0b001010100
]

canvas.width = canvas.height = 3 * cellSize

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
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 4
    for (let k = 0; k < gameBoardValues.length; k++) {
      let location = getCellLocation(k)

      ctx.save()
      ctx.translate(location.x + cellSize / 2, location.y + cellSize / 2)
      if (gameBoardValues[k] == 'X') {
        console.log('are we drawing things?')
        drawX()
      } else if (gameBoardValues[k] == 'O') {
        console.log('do we get here?')
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
    'y': y
  }
}

render()