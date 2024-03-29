import Tag from './Tag'

export default class Status {
  status: { isClosestToRef: boolean }
  source: { [key: string]: number }
  node: FrameNode | null

  constructor(
    status: { isClosestToRef: boolean },
    source: { [key: string]: number }
  ) {
    this.status = status
    this.source = source
    this.node = null
  }

  makeNode = () => {
    // base
    this.node = figma.createFrame()
    this.node.name = '_status'
    this.node.fills = []

    // layout
    this.node.layoutMode = 'HORIZONTAL'
    this.node.primaryAxisSizingMode = 'FIXED'
    this.node.layoutAlign = 'STRETCH'
    this.node.layoutSizingVertical = 'HUG'

    if (this.status.isClosestToRef)
      this.node.appendChild(
        new Tag('_close', 'Closest to source', 10).makeNodeTag(
          [this.source.r, this.source.g, this.source.b, 1],
          true
        )
      )

    return this.node
  }
}
