import { Texture } from 'pixi.js-legacy'
import { RECT_IMAGE_TEXTURE_STYLE } from '../../config/random-shape.config.ts'
import { ColorConverter } from '../../core/ColorConverter.ts'
import type { IRandomProvider } from '../../core/IRandomProvider.ts'

export class RectImageTextureFactory {
  create(width: number, height: number, baseColor: number, random: IRandomProvider): Texture {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Canvas 2D context is not available')
    }

    this.drawCircles(context, width, height, baseColor, random)
    this.drawBorder(context, width, height)

    return Texture.from(canvas)
  }

  private drawCircles(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    baseColor: number,
    random: IRandomProvider,
  ): void {
    context.fillStyle = ColorConverter.toCssHex(baseColor)
    context.fillRect(0, 0, width, height)

    const circleCount = Math.floor(
      random.nextNumberInRange(
        RECT_IMAGE_TEXTURE_STYLE.circleCount.min,
        RECT_IMAGE_TEXTURE_STYLE.circleCount.max + 1,
      ),
    )

    for (let i = 0; i < circleCount; i++) {
      const radius = random.nextNumberInRange(
        RECT_IMAGE_TEXTURE_STYLE.circleRadius.min,
        RECT_IMAGE_TEXTURE_STYLE.circleRadius.max,
      )
      const x = random.nextNumberInRange(0, width)
      const y = random.nextNumberInRange(0, height)

      context.beginPath()
      context.fillStyle = ColorConverter.adjustBrightness(
        baseColor,
        i % 2 === 0
          ? RECT_IMAGE_TEXTURE_STYLE.brightnessShift
          : -RECT_IMAGE_TEXTURE_STYLE.brightnessShift,
      )
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
    }
  }

  private drawBorder(context: CanvasRenderingContext2D, width: number, height: number): void {
    const strokeWidth = RECT_IMAGE_TEXTURE_STYLE.strokeWidth
    const strokeInset = strokeWidth / 2

    context.strokeStyle = RECT_IMAGE_TEXTURE_STYLE.strokeColor
    context.lineWidth = strokeWidth
    context.strokeRect(
      strokeInset,
      strokeInset,
      width - strokeInset * 2,
      height - strokeInset * 2,
    )
  }
}
