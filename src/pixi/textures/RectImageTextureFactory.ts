import { Texture } from 'pixi.js-legacy'
import { ColorConverter } from '../../core/ColorConverter.ts'
import { RECT_IMAGE_TEXTURE_STYLE } from '../../config/random-shape.config.ts'

export class RectImageTextureFactory {
  create(width: number, height: number, color: number): Texture {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Canvas 2D context is not available')
    }

    context.fillStyle = ColorConverter.toCssHex(color)
    context.fillRect(0, 0, width, height)
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

    return Texture.from(canvas)
  }
}
