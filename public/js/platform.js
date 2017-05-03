// levelplan x = wall, @ = player, equal or | = moving laving, o = coin, ! = nonmoving lava

let simpleLevelPlan = [
  "                      ",
  "                      ",
  "  x              = x  ",
  "  x         o o    x  ",
  "  x @      xxxxx   x  ",
  "  xxxxx            x  ",
  "      x!!!!!!!!!!!!x  ",
  "      xxxxxxxxxxxxxx  ",
  "                      "
]

function Level(plan) {
  this.width = plan[0].length
  this.height = plan.length
  this.grid = []
  this.elements = []
}

for (let y = 0; y < this.height; y++) {
  let line = plan[y],
    gridLine = []
  for (let x = 0; x < this.width; x++) {
    let char = line[x],
      fieldType = null;
    let Element = elementCharacters[char]
    if (Element) {
      this.elements.push(new Element(new Vector(x, y), char))
    } else if (char == 'x') {
      fieldType = 'wall'
    } else if (char == '!') {
      fieldType = 'lava'
      gridLine.push(fieldType)
    }
    this.grid.push(gridLine)
  }
  this.player = this.elements.filter((element) => {
    return element.type == 'player'
  })[0]
  this.status = this.finishDelay = null
}

function Vector(x, y) {
  this.x = x
  this.y = y
}

Level.prototype.isFinished = () => {
  return this.status != null && this.finishDelay < 0
}

Vector.prototype.plus = (other) => {
  return new Vector(this.x + other.x, this.y + other.y)
}

Vector.prototype.times = (factor) => {
  return new Vector(this.x * factor, this.y * factor)
}

const elementCharacters = {
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

function Lava(postion, char) {
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

let simpleLevel = new Level(simpleLevelPlan)
console.log(simpleLevel.width, 'by', simpleLevel.height)

// DRAWING functionality
// TODO: make this modular? / split level creation and drawing into separate files?

function elt(name, className) {
  let elt = document.createElement(name)
  if (className) elt.className = className
  return elt
}

function DOMdisplay(parent, level) {
  this.wrap = parent.appendChild(elt('div', 'game'))
  this.level = level

  this.wrap.appendChild(this.drawBackground())
  this.elementLayer = null
  this.drawFrame()
}

const scale = 20

DOMdisplay.prototype.drawBackground = () => {
  let table = elt('table', 'background')
  table.style.width = this.level.width * scale + 'px'
  this.level.grid.forEach((row) => {
    let rowElt = table.appendChild(elt('tr'))
    rowElt.style.height = scale + 'px'
    row.ForEach((type) => {
      row.appendChild(elt('td', type))
    })
  })
  return table
}

DOMdisplay.prototype.drawElements = () => {
  let wrap = elt('div')
  this.level.elements.forEach((element) => {
    let rect = wrap.appendChild(elt('div', element + element.type))
    rect.style.width = element.size.x * scale + 'px'
    rect.style.height = element.size.y * scale + 'px'
    rect.style.left = element.position.x * scale + 'px'
    rect.style.top = element.position.y * scale + 'px'
  })
  return wrap
}

DOMdisplay.prototype.drawFrame = () => {
  if (this.elementLayer)
    this.wrap.removeChild(this.elementLayer)
  this.elementLayer = this.wrap.appendChild(this.drawElements())
  this.wrap.className = 'game' + (this.level.status || '')
  this.scrollPlayerIntoView
}

DOMdisplay.prototype.scrollPlayerIntoView = () => {
  let width = this.wrap.clientWidth
  let height = this.wrap.clientHeight
  let margin = width / 3

  let left = this.wrap.scrollLeft,
    right = left + width
  let top = this.wrap.scrollTop,
    bottom = top + height

  let player = this.level.player
  let center = player.position.plus(player.size.times(0.5))
    .times(scale)

  if (center.x < left + margin) {
    this.wrap.scrollLeft = center.x - margin
  } else if (center.x > right - margin) {
    this.wrap.scrollLeft = center.x + margin - width
  }
  if (center.y < top.margin) {
    this.wrap.scrollTop = center.y - margin
  } else if (center.y > bottom - margin) {
    this.wrap.scrollTop = center.y + margin - height
  }
}

DOMdisplay.prototype.clear = () => {
  this.wrap.parentNode.removeChild(this.wrap)
}

// motion and collision 

Level.prototype.obsticleAt = (position, size) => {
  let xStart = Math.floor(position.x)
  let xEnd = Math.ceil(position.x + size.x)
  let yStart = Math.floor(position.y)
  let yEnd = Math.ceil(position.y + size.y)

  if (xStart < 0 || xEnd > this.width || ystart < 0) {
    return 'wall'
  }
  if (yEnd > this.height) {
    return 'lava'
  }
  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let fieldType = this.grid[y][x]
      if (fieldType) return fieldType
    }
  }
}

Level.prototype.elementAt = (element) => {
  for (let i = 0; i < this.elements.length; i++) {
    let other = this.elements[i]
    if (other != element &&
      actor.position.x + actor.size.x > other.position.x &&
      actor.position.x < other.position.x + other.size.x &&
      actor.position.y + actor.size.y > other.position.y &&
      actor.position.y < other.position.y + other.size.y)
      return other
  }
}
