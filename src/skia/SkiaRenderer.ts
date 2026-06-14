import type { CanvasKit, Canvas, Paint, Surface } from 'canvaskit-wasm'

export class SkiaRenderer {
  private readonly canvasKit: CanvasKit
  private surface: Surface | null = null

  constructor(
    canvasKit: CanvasKit,
    canvas: HTMLCanvasElement,
  ) {
    this.canvasKit = canvasKit
    this.surface = canvasKit.MakeCanvasSurface(canvas) // связываем Skia с канвой 
    if (!this.surface) {
      throw new Error('Failed to create Skia surface')
    }
  }

  drawTestScene(): void {
    if (!this.surface) return

    const canvas = this.surface.getCanvas()
    const canvasKit = this.canvasKit

    canvas.clear(canvasKit.Color(245, 245, 245, 1))

    this.drawFilledCircle(canvas, canvasKit, 120, 100, 50, [231, 76, 60])
    this.drawFilledRect(canvas, canvasKit, 220, 60, 100, 80, [52, 152, 219])
    this.drawLine(canvas, canvasKit, 80, 200, 200, 200, [243, 156, 18])

    this.surface.flush()
  }

  clear(): void {
    if (!this.surface) return
    this.surface.getCanvas().clear(this.canvasKit.Color(245, 245, 245, 1))
    this.surface.flush()
  }

  private drawFilledCircle(
    canvas: Canvas,
    CanvasKit: CanvasKit,
    x: number,
    y: number,
    radius: number,
    rgb: [number, number, number],
  ): void {
    const paint = this.createFillPaint(CanvasKit, rgb)
    canvas.drawCircle(x, y, radius, paint)
    paint.delete()
  }

  private drawFilledRect(
    canvas: Canvas,
    CanvasKit: CanvasKit,
    x: number,
    y: number,
    w: number,
    h: number,
    rgb: [number, number, number],
  ): void {
    const paint = this.createFillPaint(CanvasKit, rgb)
    canvas.drawRect(CanvasKit.LTRBRect(x, y, x + w, y + h), paint)
    paint.delete()
  }

  private drawLine(
    canvas: Canvas,
    CanvasKit: CanvasKit,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    rgb: [number, number, number],
  ): void {
    const paint = new CanvasKit.Paint()
    paint.setColor(CanvasKit.Color(rgb[0], rgb[1], rgb[2], 1))
    paint.setStyle(CanvasKit.PaintStyle.Stroke)
    paint.setStrokeWidth(6)

    canvas.drawLine(x1, y1, x2, y2, paint)
    paint.delete()
  }

  private createFillPaint(CanvasKit: CanvasKit, rgb: [number, number, number]): Paint {
    const paint = new CanvasKit.Paint()
    paint.setColor(CanvasKit.Color(rgb[0], rgb[1], rgb[2], 1))
    paint.setStyle(CanvasKit.PaintStyle.Fill)
    return paint
  }
}