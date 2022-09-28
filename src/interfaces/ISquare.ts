interface ISquare {
  x: number
  y: number
  size: number
  fillColor: string
  strokeColor: string
  cursorIsOnSquare: boolean

  fill(ctx: CanvasRenderingContext2D): void
  stroke(ctx: CanvasRenderingContext2D): void
  flicker(ctx: CanvasRenderingContext2D): void
}
