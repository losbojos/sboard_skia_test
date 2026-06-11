import type { Graphics } from 'pixi.js-legacy'
import { RANDOM_SHAPE_RANGES } from '../../config/random-shape.config.ts'
import { AbstractGraphicsShapeBuilder } from './AbstractGraphicsShapeBuilder.ts'
import type { ShapeBuildContext } from './ShapeBuildContext.ts'
import { ShapeType } from './ShapeType.ts'

export class LineShapeBuilder extends AbstractGraphicsShapeBuilder {
  readonly type = ShapeType.Line

  protected draw(graphics: Graphics, color: number, context: ShapeBuildContext): void {
    const endX = context.random.nextNumberInRange(
      RANDOM_SHAPE_RANGES.line.endX.min,
      RANDOM_SHAPE_RANGES.line.endX.max,
    )
    const endY = context.random.nextNumberInRange(
      RANDOM_SHAPE_RANGES.line.endY.min,
      RANDOM_SHAPE_RANGES.line.endY.max,
    )
    const lineWidth = context.random.nextNumberInRange(
      RANDOM_SHAPE_RANGES.line.width.min,
      RANDOM_SHAPE_RANGES.line.width.max,
    )

    graphics
      .lineStyle(lineWidth, color, RANDOM_SHAPE_RANGES.line.alpha)
      .moveTo(0, 0)
      .lineTo(endX, endY)
  }
}
