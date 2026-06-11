import { Application } from 'pixi.js-legacy'
import { CANVAS_BACKGROUND_COLOR, type CanvasSize } from '../config/canvas.config.ts'
import { DOM_IDS } from '../config/dom.config.ts'
import { PIXI_APP_OPTIONS } from '../config/pixi.config.ts'
import { CanvasSizeCalculator } from '../core/CanvasSizeCalculator.ts'
import { ColorConverter } from '../core/ColorConverter.ts'
import { MathRandomProvider } from '../core/MathRandomProvider.ts'
import { PdfExporterStub } from '../pdf/PdfExporterStub.ts'
import { RandomShapeFactory } from '../pixi/shapes/RandomShapeFactory.ts'
import { ControlsBinder } from '../ui/ControlsBinder.ts'
import type { IPdfExporter } from '../pdf/IPdfExporter.ts'

export class App {
  private readonly canvasSize: CanvasSize
  private readonly randomShapeFactory: RandomShapeFactory
  private readonly pdfExporter: IPdfExporter = new PdfExporterStub()

  constructor() {
    this.canvasSize = CanvasSizeCalculator.compute()
    this.randomShapeFactory = new RandomShapeFactory(new MathRandomProvider(), this.canvasSize)
  }

  run(): void {
    const pixiRoot = this.requireElement(DOM_IDS.pixiRoot)
    const skiaRoot = this.requireElement(DOM_IDS.skiaRoot)

    const pixiApp = this.createPixiApp()
    const skiaCanvas = this.createSkiaCanvas()

    this.mountCanvas(pixiRoot, pixiApp.view as HTMLCanvasElement)
    this.mountCanvas(skiaRoot, skiaCanvas)

    new ControlsBinder({
      onRandomShape: () => {
        this.randomShapeFactory.createAndAddTo(pixiApp.stage)
      },
      onClearCanvas: () => {
        this.clearPixiStage(pixiApp)
        this.clearSkiaCanvas(skiaCanvas)
      },
      onExportPdf: () => this.pdfExporter.export(),
    }).bind()
  }

  private clearPixiStage(pixiApp: Application): void {
    pixiApp.stage.removeChildren().forEach((child) => {
      child.destroy({ children: true })
    })
  }

  private clearSkiaCanvas(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d')
    context?.clearRect(0, 0, canvas.width, canvas.height)
  }

  private createPixiApp(): Application {
    return new Application({
      width: this.canvasSize.width,
      height: this.canvasSize.height,
      backgroundColor: CANVAS_BACKGROUND_COLOR,
      forceCanvas: PIXI_APP_OPTIONS.forceCanvas,
      antialias: PIXI_APP_OPTIONS.antialias,
    })
  }

  private createSkiaCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.width = this.canvasSize.width
    canvas.height = this.canvasSize.height
    canvas.className = 'skia-canvas'
    canvas.style.backgroundColor = ColorConverter.toCssHex(CANVAS_BACKGROUND_COLOR)

    return canvas
  }

  private mountCanvas(root: HTMLElement, canvas: HTMLCanvasElement): void {
    root.appendChild(canvas)
  }

  private requireElement(id: string): HTMLElement {
    const element = document.getElementById(id)
    if (!element) {
      throw new Error(`Element #${id} not found`)
    }
    return element
  }
}
