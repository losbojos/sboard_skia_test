import type { IPdfExporter } from './IPdfExporter.ts'

export class PdfExporterStub implements IPdfExporter {
  async export(): Promise<void> {
    // TODO: реализовать на этапе Skia PDF backend
    console.warn('Экспорт в PDF пока не реализован')
  }
}
