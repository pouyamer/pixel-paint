class Color implements IColor {
  hue
  saturation
  lightness
  alpha

  constructor(
    hue: number,
    saturation: number,
    lightness: number,
    alpha: number
  ) {
    this.hue = hue
    this.saturation = saturation
    this.lightness = lightness
    this.alpha = alpha
  }

  stringify = () => {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`
  }
}
