var canvas = document.getElementById('board')
var ctx = canvas.getContext('2d')
var clear = window.getComputedStyle(canvas).getPropertyValue('background-color')
var width = 10
var height = 20
var tilesZ = 24
canvas.width = width * tilesZ
canvas.height = height * tilesZ

var board = []
for (var row = 0; row < height; row++) {
  board[row] = []
  for (var cell = 0; cell < width; cell++) {
    board[row][cell] = ""
  }
}

function newPiece() {
  var p = pieces[parseInt(Math.random() * pieces.length, 10)]
  return new Piece(p[0], p[1])
}

function drawSquare(x, y) {
  ctx.fillRect(x * tilesZ, y * tilesZ, tilesZ, tilesZ)
  var sStyle = ctx.strokeStyle
  ctx.strokeStyle = "#555"
  ctx.strokeRect(x * tilesZ, y * tilesZ, tilesZ, tilesZ)
  ctx.strokeStyle = "#888"
  ctx.strokeStyle = sStyle
}

function Piece(patterns, color) {
  this.pattern = patterns[0]
  this.patterns = patterns
  this.patterni = 0

  this.color = color

  this.x = width / 2 - parseInt(Math.ceil(this.pattern.length / 2), 10)
  this.y = -2
}

Piece.prototype.rotate = function() {
  var nudge = 0;
  var nextPat = this.patterns[(this.patterni + 1) % this.patterns.length]

  if (this._collides(0, 0, nextPat)) {
    nudge = this.x > width / 2 ? -1 : 1
  }

  if (!this._collides(nudge, 0, nextPat)) {
    this.undraw()
    this.x += nudge
    this.patterni = (this.patterni + 1) % this.patterns.length
    this.pattern = this.patterns[this.patterni]
    this.draw()
  }
}

var WALL = 1
var BLOCK = 2
Piece.prototype._collides = function(dx, dy, pat) {
  for (var ix = 0; ix < pat.length; ix++) {
    for (var iy = 0; iy < pat.length; iy++) {
      if (!pat[ix][iy]) {
        continue
      }

      var x = this.x + ix + dx
      var y = this.y + iy + dy
      if (y >= height || x < 0 || x >= width) {
        return WALL
      }
      if (y < 0) {
        continue
      }
      if (board[y][x] !== "") {
        return BLOCK
      }
    }
  }
  return 0
}

Piece.prototype.down = function() {
  if (this._collides(0, 1, this.pattern)) {
    this.lock()
    piece = newPiece()
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
  if (!this._collides(-1, 0, this.pattern)) {
    this.undraw()
    this.x--
      this.draw()
  }
}

var lines = 0
var points = 0
var done = false
Piece.prototype.lock = function() {
  for (var ix = 0; ix < this.pattern.length; ix++) {
    for (var iy = 0; iy < this.pattern.length; iy++) {
      if (!this.pattern[ix][iy]) {
        continue
      }

      if (this.y + iy < 0) {
        alert("Game Over\n\nYour Score: " + points)
        done = true
        return
      }
      board[this.y + iy][this.x + ix] = this.color
    }
  }
  var nlines = 0
  for (var y = 0; y < height; y++) {
    var line = true
    for (var x = 0; x < width; x++) {
      line = line && board[y][x] !== ""
    }
    if (line) {
      for (var y2 = y; y2 > 1; y2--) {
        for (var x = 0; x < width; x++) {
          board[y2][x] = board[y2 - 1][x]
        }
      }
      for (var x = 0; x < width; x++) {
        board[0][x] = ""
      }
      nlines++
    }
  }
  if (nlines > 0) {
    lines += nlines
    drawBoard()
    levelUp()
    $('.lines').text('Lines: ' + lines)
    if (nlines == 1) {
      points += 40
    }
    if (nlines == 2) {
      points += 100
    }
    if (nlines == 3) {
      points += 300
    }
    if (nlines == 4) {
      points += 1200
    }
    $('.score').text('Points: ' + points)
  }
}

Piece.prototype._fill = function(color) {
  var fStyle = ctx.fillStyle
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
  this._fill(clear)
}

Piece.prototype.draw = function(ctx) {
  this._fill(this.color)
}

var pieces = [
  [I, "cyan"],
  [J, "blue"],
  [L, "orange"],
  [O, "yellow"],
  [S, "green"],
  [T, "purple"],
  [Z, "red"]
]

var piece = null
var dropStart = Date.now()

$(document).ready(function() {
  $(document).keydown(function(event) {
    if (done) {
      return
    }
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

  $(".NewGameBtn").click(function() {
    location.reload(true)
  })
})

function drawBoard() {
  var fStyle = ctx.fillStyle
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      ctx.fillStyle = board[y][x] || clear
      drawSquare(x, y, tilesZ, tilesZ)
    }
  }
  ctx.fillStyle = fStyle
}

var gameLevel = 1
var levelTime = 1000

function levelUp() {
  console.log("LEVEL UP!")
  console.log(gameLevel)
  console.log(levelTime)
  if (lines < 1) {
    gameLevel = 1
    levelTime = 1000
  }
  if (lines > 1) {
    gameLevel = 2
    levelTime = 950
  }
  if (lines > 2) {
    gameLevel = 3
    levelTime = 925
  }
  if (lines > 3) {
    gameLevel = 4
    levelTime = 900
  }
  if (lines > 4) {
    gameLevel = 5
    levelTime = 875
  }
  if (lines > 5) {
    gameLevel = 6
    levelTime = 850
  }
  if (lines > 6) {
    gameLevel = 7
    levelTime = 825
  }
  if (lines > 7) {
    gameLevel = 8
    levelTime = 800
  }
  if (lines > 8) {
    gameLevel = 9
    levelTime = 750
  }
  if (lines > 9) {
    gameLevel = 10
    levelTime = 700
  }
  $('.level').text('Level: ' + gameLevel)
}

function main() {
  var now = Date.now()
  var delta = now - dropStart

  if (delta > levelTime) {
    piece.down()
    dropStart = now
  }
  if (!done) {
    requestAnimationFrame(main)
  }
}

piece = newPiece()
drawBoard()
main()
