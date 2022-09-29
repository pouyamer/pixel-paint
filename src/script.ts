const canvas = document.querySelector(".canvas") as HTMLCanvasElement
const elColorPicker = document.querySelector(".colors") as HTMLElement
const elBtnSaveDrawing = document.querySelector(
  ".btn-save-drawing"
) as HTMLButtonElement

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const { size } = config.canvas

canvas.width = size
canvas.height = size

let brushHue = 0

let activeColorIndex: number = 0

const colorOptions = Array(config.canvas.colors)
  .fill(null)
  .map(
    (_, i) =>
      new Color(
        (360 * i) / config.canvas.colors,
        config.color.saturation,
        config.color.lightness,
        1
      )
  )

let currentColor = colorOptions[0]
let mouseOnCanvas: boolean = false

// Initiatializing the squares
let squares: Square[] = []
const { squareCount } = config.canvas
for (let i = 0; i < size; i += size / squareCount) {
  for (let j = 0; j < size; j += size / squareCount) {
    squares.push(
      new Square(i, j, size / squareCount, "transparent", "black", true)
    )
  }
}

const animate = (): void => {
  const { showGrid } = config.canvas
  for (let square of squares) {
    square.fill(ctx)
    showGrid && square.stroke(ctx)
  }
  requestAnimationFrame(animate)
}

// ===== MAIN APP ====

// Animate the main canvas
animate()

// create Color Selection Elements

const colorElements = colorOptions.map((color, i) => {
  const elColor = document.createElement("div")

  elColor.classList.add("color")
  elColor.classList.add(`color-${i}`)
  elColor.style.backgroundColor = color.stringify()
  console.log(color.stringify())

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
elBtnSaveDrawing.style.color = currentColor.stringify()
elBtnSaveDrawing.style.borderColor = currentColor.stringify()

// TODO: Add Eraser, Clear btn,
// TODO: toggle show grid
// TODO: toggle show cursor
// TODO: add IncreasingLightness and IncreasingSaturation Modes
// DONE: Added Brush size
