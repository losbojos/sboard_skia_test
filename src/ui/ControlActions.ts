export type ControlActions = Readonly<{
  onRandomShape: () => void
  onExportPdf: () => void | Promise<void>
}>
