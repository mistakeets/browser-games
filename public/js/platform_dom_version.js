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

function elt(name, className) {
  var elt = document.createElement(name)
  if (className) elt.className = className
  return elt
}

function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(elt('div', 'game'))
  this.level = level

  this.wrap.appendChild(this.drawBackground())
  this.actorLayer = null
  this.drawFrame()
}

var scale = 20

DOMDisplay.prototype.drawBackground = function() {
  var table = elt('table', 'background')
  table.style.width = this.level.width * scale + 'px'
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt('tr'))
    rowElt.style.height = scale + 'px'
    row.forEach(function(type) {
      rowElt.appendChild(elt('td', type))
    })
  })
  return table
}

DOMDisplay.prototype.drawActors = function() {
  var wrap = elt('div')
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt('div',
      'actor ' + actor.type))
    rect.style.width = actor.size.x * scale + 'px'
    rect.style.height = actor.size.y * scale + 'px'
    rect.style.left = actor.position.x * scale + 'px'
    rect.style.top = actor.position.y * scale + 'px'
  })
  return wrap
}

DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer)
  this.actorLayer = this.wrap.appendChild(this.drawActors())
  this.wrap.className = 'game ' + (this.level.status || '')
  this.scrollPlayerIntoView()
}

DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth
  var height = this.wrap.clientHeight
  var margin = width / 3

  // The viewport
  var left = this.wrap.scrollLeft
  var right = left + width
  var top = this.wrap.scrollTop
  var bottom = top + height

  var player = this.level.player
  var center = player.position.plus(player.size.times(0.5))
    .times(scale);

  if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height
}

DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap)
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

var arrowCodes = { 37: 'left', 38: 'up', 39: 'right' }

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
