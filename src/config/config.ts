let config = {
  canvas: {
    showGrid: false,
    // color options
    colors: 16,
    // how many squares per row / column
    squareCount: 64,
    // height and width of the canvas
    size: 700
  },
  color: {
    saturation: 85,
    lightness: 70
  },
  brush: {
    mode: brushMode.ShadesMode,
    size: 3,
    randomizedSize: true,
    // if brush mode size is ranged (randomizedBrushSize) then picks from a range:
    sizeRange: {
      min: 0,
      max: 8
    },
    // IncreasingOrDecreasingHue config
    hueIncOrDec: {
      rate: 1,
      increasing: true
    },

    // ShadesMode config
    shadesMode: {
      range: {
        min: 20,
        max: 70
      }
    }
  }
}
