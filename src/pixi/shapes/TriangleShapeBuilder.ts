import type { Graphics } from 'pixi.js-legacy'
import { RANDOM_SHAPE_RANGES } from '../../config/random-shape.config.ts'
import { AbstractGraphicsShapeBuilder } from './AbstractGraphicsShapeBuilder.ts'
import type { ShapeBuildContext } from './ShapeBuildContext.ts'
import { ShapeType } from './ShapeType.ts'

export class TriangleShapeBuilder extends AbstractGraphicsShapeBuilder {
  readonly type = ShapeType.Triangle

  protected draw(graphics: Graphics, color: number, context: ShapeBuildContext): void {
    const size = context.random.nextNumberInRange(
      RANDOM_SHAPE_RANGES.triangle.size.min,
      RANDOM_SHAPE_RANGES.triangle.size.max,
    )

    graphics
      .beginFill(color)
      .drawPolygon([0, -size / 2, -size / 2, size / 2, size / 2, size / 2])
      .endFill()
  }
}
