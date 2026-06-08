import { Application } from 'pixi.js-legacy'

export function createPixiApp(width = 800, height = 600): Application {
  const app = new Application({
    width,
    height,
    backgroundColor: 0xf5f5f5,
    forceCanvas: true, // Pixi рисует через Canvas 2D, а не WebGL
    antialias: true,
  })

  return app;
}