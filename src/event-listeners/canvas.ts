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

  let { size: brushSize, sizeRange, randomizedSize } = config.brush

  const selectedSquares = squares.filter((square: Square) => {
    if (randomizedSize) {
      brushSize =
        Math.floor(Math.random() * (sizeRange.max - sizeRange.min + 1)) +
        sizeRange.min
    }

    const { x, y } = mousePositionRelativeToClick

    const minX = square.x - square.size * (brushSize - 1)
    const maxX = square.x + square.size * brushSize
    const minY = square.y - square.size * (brushSize - 1)
    const maxY = square.y + square.size * brushSize

    return x >= minX && x <= maxX && y >= minY && y <= maxY
  }) as Square[]

  const selectedSquaresExist = selectedSquares.reduce((a, b) => {
    return a && b
  })

  // if mouse is clicking and selected square exists
  if (mouseOnCanvas && selectedSquaresExist) {
    selectedSquares.forEach(square => {
      // square.fillColor = currentColor.stringify()

      const { mode } = config.brush

      switch (mode.valueOf()) {
        case brushMode.IncreasingOrDecreasingHue.valueOf():
          const { hueIncOrDec } = config.brush
          square.fillColor = new Color(
            brushHue,
            config.color.saturation,
            config.color.lightness,
            1
          ).stringify()
          brushHue =
            brushHue +
            (hueIncOrDec.increasing ? hueIncOrDec.rate : -hueIncOrDec.rate)
          break
        case brushMode.PartyMode.valueOf():
          square.fillColor =
            colorOptions[
              Math.floor(Math.random() * colorOptions.length)
            ].stringify()
          break

        case brushMode.ShadesMode.valueOf():
          const { min, max } = config.brush.shadesMode.range
          const { hue, saturation } = currentColor
          square.fillColor = new Color(
            hue,
            saturation,
            Math.floor(Math.random() * (max - min + 1)) + min,

            1
          ).stringify()
          break
        default:
          square.fillColor = currentColor.stringify()
          break
      }
    })
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
