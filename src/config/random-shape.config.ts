export const RANDOM_SHAPE_RANGES = {
  rotation: { min: 0, max: 360 }, // min: -30, max: 30
  rect: {
    width: { min: 40, max: 120 },
    height: { min: 40, max: 120 },
  },
  ellipse: {
    radiusX: { min: 30, max: 80 },
    radiusY: { min: 20, max: 60 },
  },
  line: {
    endX: { min: 50, max: 150 },
    endY: { min: 50, max: 150 },
    width: { min: 4, max: 10 },
    alpha: 1,
  },
  triangle: {
    size: { min: 40, max: 100 },
  },
  polygon: {
    vertexCount: { min: 3, max: 10 },
    radius: { min: 30, max: 80 },
  },
  image: {
    width: { min: 50, max: 130 },
    height: { min: 35, max: 90 },
  },
} as const

export const RECT_IMAGE_TEXTURE_STYLE = {
  strokeColor: 'rgba(0, 0, 0, 0.35)',
  strokeWidth: 2,
} as const
