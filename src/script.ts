const canvas = document.querySelector(".canvas") as HTMLCanvasElement
const elColorPicker = document.querySelector(".colors") as HTMLElement
const elBtnSaveDrawing = document.querySelector(
  ".btn-save-drawing"
) as HTMLButtonElement

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const size = { width: 700, height: 700 }
canvas.width = size.width
canvas.height = size.height

enum brushMode {
  PartyMode,
  SingleColor,
  IncreasingHue
}

let brushSize = 3

let randomizedBrushSize: boolean = true

// if brush mode size is ranged (randomizedBrushSize) then picks from a range:
const brushSizeRange = {
  min: 0,
  max: 3
}

// if brush mode is IncreasingHue
let brushHue = 0
const brushIncreasingHueRate = 1

const currentBrushMode = brushMode.IncreasingHue

const colorConfig = {
  saturation: 85,
  lightness: 70
}

const h_alpha = 0.5 // alpha for highlighted Block(s)

const howManyColors = 16
const pixelsCount = 64

let activeColorIndex: number

const colorOptions = Array(howManyColors)
  .fill(null)
  .map(
    (_, i) =>
      new Color(
        (360 * i) / howManyColors,
        colorConfig.saturation,
        colorConfig.lightness,
        1
      )
  )

const highlightedColors = colorOptions.map(
  color => new Color(color.hue, color.saturation, color.lightness, h_alpha)
)

let currentColor = colorOptions[0]
let mouseOnCanvas: boolean = false

// Initiatializing the squares
let squares: Square[] = []
for (let i = 0; i < size.width; i += size.width / pixelsCount) {
  for (let j = 0; j < size.height; j += size.height / pixelsCount) {
    squares.push(
      new Square(i, j, size.height / pixelsCount, "transparent", "black", true)
    )
  }
}

const animate = (): void => {
  ctx.clearRect(0, 0, size.height, size.width)
  for (let square of squares) {
    square.fill(ctx)
    square.stroke(ctx)
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
