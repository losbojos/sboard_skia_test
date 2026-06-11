import type { Container } from 'pixi.js-legacy'
import type { IRandomProvider } from '../../core/IRandomProvider.ts'

export type ShapeBounds = Readonly<{
  width: number
  height: number
}>

export type ShapeBuildContext = Readonly<{
  container: Container
  random: IRandomProvider
  bounds: ShapeBounds
}>
