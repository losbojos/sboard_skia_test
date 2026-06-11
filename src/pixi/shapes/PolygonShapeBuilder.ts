import type { Graphics } from 'pixi.js-legacy'
import { RANDOM_SHAPE_RANGES } from '../../config/random-shape.config.ts'
import { AbstractGraphicsShapeBuilder } from './AbstractGraphicsShapeBuilder.ts'
import type { ShapeBuildContext } from './ShapeBuildContext.ts'
import { ShapeType } from './ShapeType.ts'

export class PolygonShapeBuilder extends AbstractGraphicsShapeBuilder {
  readonly type = ShapeType.Polygon

  protected draw(graphics: Graphics, color: number, context: ShapeBuildContext): void {
    const { min: minVertices, max: maxVertices } = RANDOM_SHAPE_RANGES.polygon.vertexCount
    const vertexCount = Math.floor(
      context.random.nextNumberInRange(minVertices, maxVertices + 1),
    )

    const radius = context.random.nextNumberInRange(
      RANDOM_SHAPE_RANGES.polygon.radius.min,
      RANDOM_SHAPE_RANGES.polygon.radius.max,
    )

    const points = this.buildVertices(vertexCount, radius)
    graphics.beginFill(color).drawPolygon(points).endFill()
  }

  private buildVertices(vertexCount: number, radius: number): number[] {
    const points: number[] = []
    const angleStep = (Math.PI * 2) / vertexCount
    const startAngle = -Math.PI / 2

    for (let i = 0; i < vertexCount; i++) {
      const angle = startAngle + angleStep * i
      points.push(Math.cos(angle) * radius, Math.sin(angle) * radius)
    }

    return points
  }
}
