const canvas = document.querySelector(".canvas") as HTMLCanvasElement
const elColorPicker = document.querySelector(".colors") as HTMLElement
const elBtnSaveDrawing = document.querySelector(
  ".btn-save-drawing"
) as HTMLButtonElement

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const size = { width: 700, height: 700 }
canvas.width = size.width
canvas.height = size.height

const colorConfig = {
  saturation: 85,
  lightness: 70
}

let isMouseDragging = false

const howManyColors = 17
const pixelsCount = 100

const colorOptions = Array(howManyColors)
  .fill(null)
  .map(
    (_, i) =>
      `hsl(${(360 * i) / howManyColors}, ${colorConfig.saturation}%, ${
        colorConfig.lightness
      }%)`
  )

let activeColorIndex: number

let currentColor = colorOptions[0]
let mouseOnCanvas: boolean = false

interface ISquare {
  x: number
  y: number
  size: number
  fillColor: string
  strokeColor: string

  fill(ctx: CanvasRenderingContext2D): void
  stroke(ctx: CanvasRenderingContext2D): void
}

class Square implements ISquare {
  x
  y
  size
  fillColor
  strokeColor

  constructor(
    x: number,
    y: number,
    size: number,
    fillColor: string,
    strokeColor: string
  ) {
    this.x = x
    this.y = y
    this.size = size
    this.fillColor = fillColor
    this.strokeColor = strokeColor
  }

  fill = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = this.fillColor
    ctx.fillRect(this.x, this.y, this.size, this.size)
    ctx.strokeStyle = "black"
    ctx.strokeRect(this.x, this.y, this.size, this.size)
  }

  stroke = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = this.strokeColor
    ctx.strokeRect(this.x, this.y, this.size, this.size)
  }
}

let squares: Square[] = []
for (let i = 0; i < size.width; i += size.width / pixelsCount) {
  for (let j = 0; j < size.height; j += size.height / pixelsCount) {
    squares.push(
      new Square(i, j, size.height / pixelsCount, "transparent", "transparent")
    )
  }
}

const animate = (): void => {
  for (let square of squares) {
    square.fill(ctx)
    square.stroke(ctx)
  }
  requestAnimationFrame(animate)
}

// ==== Event Listeners ====
// #region eventlisteners

// canvas
canvas.addEventListener("mousedown", () => {
  mouseOnCanvas = true
})

canvas.addEventListener("mouseup", () => {
  mouseOnCanvas = false
})

canvas.addEventListener("mouseout", () => {
  mouseOnCanvas = false
})

const paintWithMouse = (e: MouseEvent) => {
  const mousePositionRelativeToClick = {
    x: e.offsetX,
    y: e.offsetY
  }

  const selectedSquare = squares.find((square: Square) => {
    const { x, y } = mousePositionRelativeToClick
    return (
      x >= square.x &&
      x <= square.x + square.size &&
      y >= square.y &&
      y <= square.y + square.size
    )
  }) as Square

  if (mouseOnCanvas && selectedSquare) {
    selectedSquare.fillColor = currentColor
  }
}

canvas.addEventListener(
  "mousemove",
  (e: MouseEvent) => e.buttons === 1 && paintWithMouse(e)
)
canvas.addEventListener("click", (e: MouseEvent) => {
  mouseOnCanvas = true
  paintWithMouse(e)
  mouseOnCanvas = false
})

const clearHover = () => {
  const allElColors = elColorPicker.querySelectorAll(".color")
  allElColors.forEach(el => el.classList.remove("hovered"))
}

// color picker
elColorPicker!.addEventListener("mouseover", (e: MouseEvent) => {
  const target = e.target as HTMLElement

  // Remove hover effect from allElements
  clearHover()
  if (target.classList.contains("color-container")) {
    // add hover effect to that specific element
    target.querySelector(".color")?.classList.add("hovered")
  }
})

elColorPicker.addEventListener("mouseleave", () => {
  clearHover()
})

elColorPicker.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement

  if (target.classList.contains("color-container")) {
    // Remove active effect from allElements
    const allElColors = elColorPicker.querySelectorAll(".color")
    allElColors.forEach(el => el.classList.remove("active"))

    // add hover effect to that specific element
    const correspondingElColor = target.querySelector(
      ".color"
    ) as HTMLDivElement
    correspondingElColor.classList.add("active")

    const colorIndex = parseInt(correspondingElColor.classList[1].split("-")[1])
    currentColor = colorOptions[colorIndex]

    // change the color of btn
    elBtnSaveDrawing.style.color = currentColor
    elBtnSaveDrawing.style.borderColor = currentColor
  }
})

// save button
elBtnSaveDrawing?.addEventListener("click", () => {
  const link = document.createElement("a")
  const date: Date = new Date()
  console.log(date.toLocaleString())
  link.download = `drawing_${date.toLocaleString()}.png`
  link.href = canvas.toDataURL()
  link.click()
})

//#endregion

// ===== MAIN APP ====

// Animate the main canvas
animate()

// create Button Elements
const colorElements = colorOptions.map((color, i) => {
  const elColor = document.createElement("div")

  elColor.classList.add("color")
  elColor.classList.add(`color-${i}`)
  elColor.style.backgroundColor = color

  return elColor
}) as HTMLDivElement[]

colorElements.forEach((el, i) => {
  const elColorContainer = document.createElement("div")
  elColorContainer.classList.add("color-container")

  elColorContainer?.appendChild(el)
  elColorPicker?.appendChild(elColorContainer)
})

// setting starting color
colorElements[0].classList.add("active")
currentColor = colorOptions[0]

// set the color of btn
elBtnSaveDrawing.style.color = currentColor
elBtnSaveDrawing.style.borderColor = currentColor

// TODO: Add Eraser, Clear btn, Brush size
// TODO: toggle show grid
// TODO: toggle show cursor
