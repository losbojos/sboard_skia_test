import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js-legacy'
import type { CanvasSize } from '../config/canvas.config.ts'
import { drawLineSegment } from './drawLineSegment.ts'
import picExampleUrl from '../assets/pic-example.png'

function regularPolygon(sides: number, radius: number): number[] {
  const points: number[] = []
  const step = (Math.PI * 2) / sides
  const start = -Math.PI / 2

  for (let i = 0; i < sides; i++) {
    const angle = start + step * i
    points.push(Math.cos(angle) * radius, Math.sin(angle) * radius)
  }

  return points
}

export function createDemoScene(bounds: CanvasSize): Container {
  const scene = new Container()
  const { width, height } = bounds

  const image = new Sprite(Texture.from(picExampleUrl))
  image.anchor.set(0.5)
  image.scale.set(0.5)
  image.position.set(width * 0.65, height * 0.5)
  scene.addChild(image)

  const rect = new Graphics()
  rect.angle = -30;
  rect.beginFill(0xe74c3c).drawRect(-40, -30, 80, 60).endFill()
  rect.position.set(width * 0.4, height * 0.6)
  scene.addChild(rect)

  const triangle = new Graphics()
  triangle.beginFill(0x3498db).drawPolygon([0, -40, -35, 35, 35, 35]).endFill()
  triangle.position.set(width * 0.42, height * 0.7)
  scene.addChild(triangle)

  const hexagon = new Graphics()
  hexagon.beginFill(0x2ecc71).drawPolygon(regularPolygon(6, 45)).endFill()
  hexagon.position.set(width * 0.68, height * 0.8)
  scene.addChild(hexagon)

  const line = new Graphics()
  drawLineSegment({
    graphics: line,
    x1: 0,
    y1: 50,
    x2: 120,
    y2: -50,
    lineWidth: 6,
    color: 0xf39c12,
  })
  line.position.set(width * 0.3, height * 0.6)
  scene.addChild(line)

  const label = new Text('Demo scene', {
    fill: 0x333333,
    fontSize: 24,
    fontFamily: 'system-ui, sans-serif',
  })
  label.position.set(width * 0.01, height * 0.01)
  scene.addChild(label)

  return scene
}
