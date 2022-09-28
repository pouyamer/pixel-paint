class Square implements ISquare {
  x
  y
  size
  fillColor
  strokeColor
  cursorIsOnSquare

  constructor(
    x: number,
    y: number,
    size: number,
    fillColor: string,
    strokeColor: string,
    cursorIsOnSquare: boolean
  ) {
    this.x = x
    this.y = y
    this.size = size
    this.fillColor = fillColor
    this.strokeColor = strokeColor
    this.cursorIsOnSquare = cursorIsOnSquare
  }

  fill = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = this.fillColor
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  stroke = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = this.strokeColor
    ctx.strokeRect(this.x, this.y, this.size, this.size)
  }

  flicker = (ctx: CanvasRenderingContext2D): void => {
    ctx.globalAlpha = 0.1
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }
}
