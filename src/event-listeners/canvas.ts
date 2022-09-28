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

  const selectedSquares = squares.filter((square: Square) => {
    if (randomizedBrushSize) {
      brushSize =
        Math.floor(
          Math.random() * (brushSizeRange.max - brushSizeRange.min + 1)
        ) + brushSizeRange.min
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

      if (currentBrushMode.valueOf() === brushMode.IncreasingHue.valueOf()) {
        square.fillColor = new Color(
          brushHue,
          colorConfig.saturation,
          colorConfig.lightness,
          1
        ).stringify()
        brushHue += brushIncreasingHueRate
        return
      }
      if (currentBrushMode.valueOf() === brushMode.PartyMode.valueOf()) {
        square.fillColor =
          colorOptions[
            Math.floor(Math.random() * colorOptions.length)
          ].stringify()
        return
      } else {
        square.fillColor = currentColor.stringify()
        return
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
