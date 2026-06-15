import { Container, DisplayObject, Graphics, type FederatedPointerEvent } from 'pixi.js-legacy'

const HIGHLIGHT_BORDER_COLOR = 0xff0000
const HIGHLIGHT_BORDER_WIDTH = 2
const HIGHLIGHT_BORDER_PADDING = 3

export class StagePointerBinder {
  private highlightedTarget: Container | null = null
  private highlightBorder: Graphics | null = null

  bind(stage: Container): void {
    stage.eventMode = 'static'
    this.enableHitTesting(stage)

    stage.on('childAdded', (child: DisplayObject) => {
      this.enableHitTestingOnBranch(child)
    })

    stage.on('pointerdown', (event: FederatedPointerEvent) => {
      const target = event.target
      if (target === stage || !(target instanceof Container)) return

      console.log('Pointer down on:', target)
      this.applyHighlight(target)
    })

    stage.on('pointerup', () => this.clearHighlight())
    stage.on('pointerupoutside', () => this.clearHighlight())
  }

  private applyHighlight(target: Container): void {
    this.clearHighlight()

    const bounds = target.getLocalBounds()
    const border = new Graphics()
    border.eventMode = 'none'
    border.lineStyle(HIGHLIGHT_BORDER_WIDTH, HIGHLIGHT_BORDER_COLOR, 1)
    border.drawRect(
      bounds.x - HIGHLIGHT_BORDER_PADDING,
      bounds.y - HIGHLIGHT_BORDER_PADDING,
      bounds.width + HIGHLIGHT_BORDER_PADDING * 2,
      bounds.height + HIGHLIGHT_BORDER_PADDING * 2,
    )

    target.addChild(border)
    this.highlightedTarget = target
    this.highlightBorder = border
  }

  private clearHighlight(): void {
    if (!this.highlightedTarget || !this.highlightBorder) return

    this.highlightedTarget.removeChild(this.highlightBorder)
    this.highlightBorder.destroy()

    this.highlightedTarget = null
    this.highlightBorder = null
  }

  private enableHitTesting(root: Container): void {
    for (const child of root.children) {
      this.enableHitTestingOnBranch(child)
    }
  }

  private enableHitTestingOnBranch(obj: DisplayObject): void {
    obj.eventMode = 'static'
    obj.cursor = 'pointer'

    if (obj instanceof Container) {
      for (const child of obj.children) {
        this.enableHitTestingOnBranch(child)
      }
    }
  }
}
