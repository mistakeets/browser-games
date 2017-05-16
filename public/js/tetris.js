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

Piece.prototype.down = function() {
  if (this._collides(0, 1, this.pattern)) {

  } else {
    this.undraw()
    this.y++
      this.draw()
  }
}

Piece.prototype.moveRight = function() {
  if (!this._collides(1, 0, this.pattern)) {
    this.undraw()
    this.x++
      this.draw()
  }
}

Piece.prototype.moveLeft = function() {
  if (!this.collides(-1, 0, this.pattern)) {
    this.undraw()
    this.x--
      this.draw()
  }
}

Piece.prototype.rotate = function() {
  var nextPat = this.patterns[(this.patterni + 1) % this.patterns.length]
  if (!this._collides(0, 0, nextPat)) {
    this.undraw()
    this.patterni = (this.patterni + 1) % this.patterns.length
    this.pattern = this.patterns[this.patterni]
    this.draw()
  }
}

Piece.prototype._fill = function(color) {
  fStyle = ctx.fillStyle
  ctx.fillStyle = color
  var x = this.x
  var y = this.y
  for (var ix = 0; ix < this.pattern.length; ix++) {
    for (var iy = 0; iy < this.pattern.length; iy++) {
      if (this.pattern[ix][iy]) {
        drawSquare(x + ix, y + iy)
      }
    }
  }
  ctx.fillStyle = fStyle
}

Piece.prototype.undraw = function(ctx) {
  this._fill("black")
}

Piece.prototype.draw = function() {
  this._fill(this.color)
}

Piece.prototype._collides = function(dx, dy, pat) {
  for (ix = 0; ix < pat.length; ix++) {
    for (iy = 0; iy < path.length; iy++) {
      if (!pat[ix][iy]) {
        continue
      }
      var x = this.x + ix + dx
      var y = this.y + iy + dx
      if (y >= height || x < 0 || x > width) {
        return true
      }
      if (y < 0) {
        continue
      }
      if (board[y][x]) {
        return true
      }
    }
  }
  return false
}

var dropStart = Date.now()
document.body.addEventListener('keypress', function(event) {
  if (event.keyCode == 38) {
    piece.rotate()
    dropStart = Date.now()
  }
  if (event.keyCode == 40) {
    piece.down()
  }
  if (event.keyCode == 37) {
    piece.moveLeft()
    dropStart = Date.now()
  }
  if (event.keyCode == 39) {
    piece.moveRight()
    dropStart = Date.now()
  }
})
