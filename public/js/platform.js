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
    } else if (char == "x") {
      fieldtype = "wall"
    } else if (char == "!") {
      fieldtype = "lava"
      gridLine.push(gridLine)
    }
  }
  this.player = this.elements.filter((element) => {
    return element.type == "player"
  })[0]
  this.status = this.finishDelay = null
}
