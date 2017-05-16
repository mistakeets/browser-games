var board = []
var canvas = document.getElementById('board')
var ctx = canvas.getContext('2d')

var width = 10
var height = 20
var tilesZ = 24

canvas.width = width * tilesZ
canvas.height = height * tilesZ

for (var row = 0; row < 20; row++) {
  board[row] = []
  for (var tile = 0; tile < 10; tile++) {
    board[row][tile] = false
  }
}

function drawSquare(x, y) {
  ctx.fillRect = (x * tilesZ, y * tilesZ, tilesZ, tilesZ)
  sStyle = ctx.strokeStyle
  ctx.strokeStyle = '#555'
  ctx.strokeRect(x * tilesZ, y * tilesZ, tilesZ, tilesZ)
  ctx.strokeStyle = '#888'
  ctx.strokeRect(x * tilesZ + 3 * tilesZ / 8, y * tilesZ + 3 * tilesZ / 8, tilesZ / 4, tilesZ / 4)
  ctx.strokeStyle = sStyle
}

function drawBoard(x, y) {
  fStyle = ctx.fillStyle
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      ctx.fillStyle = board[y][x] ? 'red' : 'white'
      drawSquare(x, y, tilesZ, tilesZ)
    }
  }
  ctx.fillStyle = fStyle
}

function Piece(patterns, color) {
  this.pattern = patterns[0]
  this.patterns = patterns
  this.patterni = 0

  this.color = color

  this.x = 0
  this.y = -2
}

Piece.prototype.draw = function() {
  fStyle = ctx.fillStyle
  ctx.fillStyle = this.color
  for (var ix = 0; ix < this.pattern.length; ix++) {
    for (var iy = 0; iy < this.pattern.length; iy++) {
      if (this.pattern.length[ix][iy]) {
        drawSquare(this.x + ix, this.y + iy)
      }
    }
  }
  ctx.fillStyle = fStyle
}
