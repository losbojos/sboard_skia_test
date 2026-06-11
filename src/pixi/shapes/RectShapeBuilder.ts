import type { Graphics } from 'pixi.js-legacy'
import { RANDOM_SHAPE_RANGES } from '../../config/random-shape.config.ts'
import { AbstractGraphicsShapeBuilder } from './AbstractGraphicsShapeBuilder.ts'
import type { ShapeBuildContext } from './ShapeBuildContext.ts'
import { ShapeType } from './ShapeType.ts'

export class RectShapeBuilder extends AbstractGraphicsShapeBuilder {
  readonly type = ShapeType.Rect

  protected draw(graphics: Graphics, color: number, context: ShapeBuildContext): void {
    const width = context.random.nextNumberInRange(
      RANDOM_SHAPE_RANGES.rect.width.min,
      RANDOM_SHAPE_RANGES.rect.width.max,
    )
    const height = context.random.nextNumberInRange(
      RANDOM_SHAPE_RANGES.rect.height.min,
      RANDOM_SHAPE_RANGES.rect.height.max,
    )

    graphics.beginFill(color).drawRect(-width / 2, -height / 2, width, height).endFill()
  }
}
