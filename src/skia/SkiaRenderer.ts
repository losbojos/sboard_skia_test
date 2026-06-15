import type { Container } from 'pixi.js-legacy'
import type { CanvasKit, Surface } from 'canvaskit-wasm'
import { CANVAS_BACKGROUND_COLOR } from '../config/canvas.config.ts'
import { ColorConverter } from '../core/ColorConverter.ts'
import { convertPixiContainerToSkia } from './convertPixiContainerToSkia.ts'

export class SkiaRenderer {
  private readonly canvasKit: CanvasKit
  private surface: Surface | null = null

  constructor(
    canvasKit: CanvasKit,
    canvas: HTMLCanvasElement,
  ) {
    this.canvasKit = canvasKit
    this.surface = canvasKit.MakeWebGLCanvasSurface(canvas) // связываем Skia с канвой 
    if (!this.surface) {
      throw new Error('Failed to create Skia surface')
    }
  }

  renderFromPixi(container: Container): void {
    if (!this.surface) return

    const skCanvas = this.surface.getCanvas()
    skCanvas.clear(
      ColorConverter.toSkiaColor(this.canvasKit, CANVAS_BACKGROUND_COLOR, 1),
    )
    convertPixiContainerToSkia(container, this.canvasKit, skCanvas)
    this.surface.flush()
  }

  clear(): void {
    if (!this.surface) return
    this.surface
      .getCanvas()
      .clear(ColorConverter.toSkiaColor(this.canvasKit, CANVAS_BACKGROUND_COLOR, 1))
    this.surface.flush()
  }
 
}