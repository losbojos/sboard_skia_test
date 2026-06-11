import type { Graphics } from 'pixi.js-legacy'
import { RANDOM_SHAPE_RANGES } from '../../config/random-shape.config.ts'
import { AbstractGraphicsShapeBuilder } from './AbstractGraphicsShapeBuilder.ts'
import type { ShapeBuildContext } from './ShapeBuildContext.ts'
import { ShapeType } from './ShapeType.ts'

export class EllipseShapeBuilder extends AbstractGraphicsShapeBuilder {
  readonly type = ShapeType.Ellipse

  protected draw(graphics: Graphics, color: number, context: ShapeBuildContext): void {
    const radiusX = context.random.nextNumberInRange(
      RANDOM_SHAPE_RANGES.ellipse.radiusX.min,
      RANDOM_SHAPE_RANGES.ellipse.radiusX.max,
    )
    const radiusY = context.random.nextNumberInRange(
      RANDOM_SHAPE_RANGES.ellipse.radiusY.min,
      RANDOM_SHAPE_RANGES.ellipse.radiusY.max,
    )

    graphics.beginFill(color).drawEllipse(0, 0, radiusX, radiusY).endFill()
  }
}
