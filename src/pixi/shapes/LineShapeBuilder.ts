import type { Graphics } from 'pixi.js-legacy'
import { RANDOM_SHAPE_RANGES } from '../../config/random-shape.config.ts'
import { drawLineSegment } from '../drawLineSegment.ts'
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

    drawLineSegment({
      graphics,
      x1: 0,
      y1: 0,
      x2: endX,
      y2: endY,
      lineWidth,
      color,
      alpha: RANDOM_SHAPE_RANGES.line.alpha,
    })
  }
}
