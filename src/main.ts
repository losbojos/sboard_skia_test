import './style.css'
import { createPixiApp } from './pixi/createPixiApp.ts'
import { Graphics } from 'pixi.js-legacy'

const root = document.querySelector<HTMLDivElement>('#pixi-root')
if (!root) {
  throw new Error('Element #pixi-root not found')
}

const app = createPixiApp()
root.appendChild(app.view as HTMLCanvasElement)

const g = new Graphics()
g.beginFill(0xff0000).drawRect(50, 50, 100, 80).endFill()
app.stage.addChild(g)