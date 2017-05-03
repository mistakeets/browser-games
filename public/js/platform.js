// levelplan x = wall, @ = player, equal or | = moving laving, o = coin, ! = nonmoving lava

const levelPlan = [
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
    let ch = line[x],
      fieldtype = null;
    let Element = elementCharacters[char]
    if (Element) {
      this.elements.push(new Element(new Vector(x, y), char))
    } else if (char == 'x') {
      fieldtype = 'wall'
    } else if (char == '!') {
      fieldtype = 'lava'
      gridLine.push(gridLine)
    }
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

let completeLevel = new Level(levelPlan)
console.log(completeLevel.width, 'by', completeLevel.height)
