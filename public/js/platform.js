// levelplan characters are x = wall, @ = player, equal or | = moving laving, o = coin, ! = nonmoving lava

var simpleLevelPlan = [
  '                      ',
  '                      ',
  '  x              = x  ',
  '  x         o o    x  ',
  '  x @      xxxxx   x  ',
  '  xxxxx            x  ',
  '      x!!!!!!!!!!!!x  ',
  '      xxxxxxxxxxxxxx  ',
  '                      '
]

// Create Level 

function Level(plan) {
  this.width = plan[0].length
  this.height = plan.length
  this.grid = []
  this.actors = []

  for (var y = 0; y < this.height; y++) {
    var line = plan[y]
    var gridLine = []
    for (var x = 0; x < this.width; x++) {
      var char = line[x]
      var fieldType = null
      var Actor = actorChars[char]
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), char))
      else if (char == 'x')
        fieldType = 'wall'
      else if (char == '!')
        fieldType = 'lava'
      gridLine.push(fieldType)
    }
    this.grid.push(gridLine)
  }
  this.player = this.actors.filter(function(actor) {
    return actor.type == 'player'
  })[0];
  this.status = this.finishDelay = null
}

Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0
}

function Vector(x, y) {
  this.x = x
  this.y = y
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y)
}
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor)
}

var actorChars = {
  '@': Player,
  'o': Coin,
  '=': Lava,
  '|': Lava,
  'v': Lava
}

function Player(position) {
  this.position = position.plus(new Vector(0, -0.5))
  this.size = new Vector(0.8, 1.5)
  this.speed = new Vector(0, 0)
}
Player.prototype.type = 'player'

function Lava(position, char) {
  this.position = position
  this.size = new Vector(1, 1)
  if (char == '=') {
    this.speed = new Vector(2, 0)
  } else if (char == '|') {
    this.speed = new Vector(0, 2)
  } else if (char == 'v') {
    this.speed = new Vector(0, 3)
    this.repeatPosition = position
  }
}
Lava.prototype.type = 'lava'

function Coin(position) {
  this.basePosition = this.position = position.plus(new Vector(0.2, 0.1))
  this.size = new Vector(0.6, 0.6)
  this.wobble = Math.random() * Math.PI * 2
}
Coin.prototype.type = 'coin'

var simpleLevel = new Level(simpleLevelPlan)

// Drawing Functionality

var scale = 20

function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}

function CanvasDisplay(parent, level) {
  this.canvas = document.createElement('canvas')
  this.canvas.width = Math.min(600, level.width * scale)
  this.canvas.height = Math.min(450, level.height * scale)
  parent.appendChild(this.canvas)
  this.ctx = this.canvas.getContext('2d')

  this.level = level
  this.animationTime = 0
  this.flipPlayer = false

  this.viewport = {
    left: 0,
    top: 0,
    width: this.canvas.width / scale,
    height: this.canvas.height / scale
  }

  this.drawFrame(0)

}

CanvasDisplay.prototype.clear = function() {
  this.canvas.parentNode.removeChild(this.canvas)
}

CanvasDisplay.prototype.drawFrame = function(step) {
  this.animationTime += step

  this.updateViewport()
  this.clearDisplay()
  this.drawBackground()
  this.drawActors()
}

CanvasDisplay.prototype.updateViewport = function() {
  var view = this.viewport
  var margin = view.width / 3
  var player = this.level.player
  var center = player.position.plus(player.size.times(0.5))

  if (center.x < view.left + margin) {
    view.left = Math.max(center.x - margin, 0)
  } else if (center.x > view.left + view.width - margin) {
    view.left = Math.min(center.x + margin - view.width, this.level.width - view.width)
  }
  if (center.y < view.top + margin) {
    view.top = Math.max(center.y - margin, 0)
  } else if (center.y > view.top + view.height - margin) {
    view.top = Math.min(center.y + margin - view.height, this.level.height - view.height)
  }
}

CanvasDisplay.prototype.clearDisplay = function() {
  if (this.level.status == 'won') {
    this.ctx.fillStyle = 'rgb(68, 191, 255)'
  } else if (this.level.status == 'lost') {
    this.ctx.fillStyle = 'rgb(44, 136, 214)'
  } else {
    this.ctx.fillStyle = 'rgb(52, 166, 251)'
  }
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
}

var otherSprites = document.createElement('img')
otherSprites.src = 'img/sprites.png'

CanvasDisplay.prototype.drawBackground = function() {
  var view = this.viewport
  var xStart = Math.floor(view.left)
  var xEnd = Math.ceil(view.left + view.width)
  var yStart = Math.floor(view.top)
  var yEnd = Math.ceil(view.top + view.height)

  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var tile = this.level.grid[y][x]
      if (tile == null) continue
      var screenX = (x - view.left) * scale
      var screenY = (y - view.top) * scale
      var tileX = tile == "lava" ? scale : 0
      this.ctx.drawImage(otherSprites, tileX, 0, scale, scale,
        screenX, screenY, scale, scale)
    }
  }
}

var playerSprites = document.createElement('img')
playerSprites.src = 'img/player1.png'
var playerXOverlap = 4

CanvasDisplay.prototype.drawPlayer = function(x, y, width, height) {
  var sprite = 8
  var player = this.level.player
  width += playerXOverlap * 2
  x -= playerXOverlap
  if (player.speed.x != 0) {
    this.flipPlayer = player.speed.x < 0
  }
  if (player.speed.y != 0) {
    sprite = 9
  } else if (player.speed.x != 0) {
    sprite = Math.floor(this.animationTime * 12) % 8
  }

  this.ctx.save()
  if (this.flipPlayer)
    flipHorizontally(this.ctx, x + width / 2);

  this.ctx.drawImage(playerSprites, sprite * width, 0, width, height, x, y, width, height)
  this.ctx.restore()
}

CanvasDisplay.prototype.drawActors = function() {
  this.level.actors.forEach(function(actor) {
    var width = actor.size.x * scale
    var height = actor.size.y * scale
    var x = (actor.position.x - this.viewport.left) * scale
    var y = (actor.position.y - this.viewport.top) * scale
    if (actor.type == 'player') {
      this.drawPlayer(x, y, width, height)
    } else {
      var tileX = (actor.type == 'coin' ? 2 : 1) * scale
      this.ctx.drawImage(otherSprites, tileX, 0, width, height, x, y, width, height);
    }
  }, this)
}


// collision and general movement 

Level.prototype.obstacleAt = function(position, size) {
  var xStart = Math.floor(position.x)
  var xEnd = Math.ceil(position.x + size.x)
  var yStart = Math.floor(position.y)
  var yEnd = Math.ceil(position.y + size.y)

  if (xStart < 0 || xEnd > this.width || yStart < 0)
    return 'wall'
  if (yEnd > this.height)
    return 'lava'
  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var fieldType = this.grid[y][x]
      if (fieldType) return fieldType
    }
  }
}

Level.prototype.actorAt = function(actor) {
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i]
    if (other != actor &&
      actor.position.x + actor.size.x > other.position.x &&
      actor.position.x < other.position.x + other.size.x &&
      actor.position.y + actor.size.y > other.position.y &&
      actor.position.y < other.position.y + other.size.y)
      return other
  }
}

// More movement, speed, gravity 

var maxStep = 0.05

Level.prototype.animate = function(step, keys) {
  if (this.status != null)
    this.finishDelay -= step

  while (step > 0) {
    var thisStep = Math.min(step, maxStep)
    this.actors.forEach(function(actor) {
      actor.act(thisStep, this, keys)
    }, this)
    step -= thisStep
  }
}

Lava.prototype.act = function(step, level) {
  var newPosition = this.position.plus(this.speed.times(step))
  if (!level.obstacleAt(newPosition, this.size))
    this.position = newPosition
  else if (this.repeatPosition)
    this.position = this.repeatPosition
  else
    this.speed = this.speed.times(-1)
}

var wobbleSpeed = 8
var wobbleDist = 0.07

Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed
  var wobblePosition = Math.sin(this.wobble) * wobbleDist
  this.position = this.basePosition.plus(new Vector(0, wobblePosition))
}

var playerXSpeed = 7

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0
  if (keys.left) this.speed.x -= playerXSpeed
  if (keys.right) this.speed.x += playerXSpeed

  var motion = new Vector(this.speed.x * step, 0)
  var newPosition = this.position.plus(motion)
  var obstacle = level.obstacleAt(newPosition, this.size)
  if (obstacle)
    level.playerTouched(obstacle)
  else
    this.position = newPosition
}

var gravity = 30
var jumpSpeed = 17

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * gravity
  var motion = new Vector(0, this.speed.y * step)
  var newPosition = this.position.plus(motion)
  var obstacle = level.obstacleAt(newPosition, this.size)
  if (obstacle) {
    level.playerTouched(obstacle)
    if (keys.up && this.speed.y > 0)
      this.speed.y = -jumpSpeed
    else
      this.speed.y = 0
  } else {
    this.position = newPosition
  }
}

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys)
  this.moveY(step, level, keys)

  var otherActor = level.actorAt(this)
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor)

  if (level.status == 'lost') {
    this.position.y += step
    this.size.y -= step
  }
}

Level.prototype.playerTouched = function(type, actor) {
  if (type == 'lava' && this.status == null) {
    this.status = 'lost'
    this.finishDelay = 1
  } else if (type == 'coin') {
    this.actors = this.actors.filter(function(other) {
      return other != actor
    })
    if (!this.actors.some(function(actor) {
        return actor.type == 'coin'
      })) {
      this.status = 'won'
      this.finishDelay = 1
    }
  }
}

// Input handler 

var arrowCodes = { 37: 'left', 32: 'up', 38: 'up', 39: 'right' }

function trackKeys(codes) {
  var pressed = Object.create(null)

  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == 'keydown'
      pressed[codes[event.keyCode]] = down
      event.preventDefault()
    }
  }
  addEventListener('keydown', handler)
  addEventListener('keyup', handler)
  return pressed
}

// Startup the game 

function runAnimation(frameFunc) {
  var lastTime = null

  function frame(time) {
    var stop = false
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000
      stop = frameFunc(timeStep) === false
    }
    lastTime = time
    if (!stop)
      requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

var arrows = trackKeys(arrowCodes)

function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level)
  runAnimation(function(step) {
    level.animate(step, arrows)
    display.drawFrame(step)
    if (level.isFinished()) {
      display.clear()
      if (andThen)
        andThen(level.status)
      return false
    }
  })
}

function runGame(plans, Display) {
  function startLevel(n) {
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == 'lost')
        startLevel(n)
      else if (n < plans.length - 1)
        startLevel(n + 1)
      else
        console.log('You win!')
    })
  }
  startLevel(0)
}
