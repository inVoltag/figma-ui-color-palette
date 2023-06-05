import type { PaletteNode } from '../utils/types'
import Sample from './Sample'

export default class Header {
  parent: PaletteNode
  node: FrameNode

  constructor(parent: PaletteNode) {
    this.parent = parent
    this.node = figma.createFrame()
  }

  makeNode() {
    // base
    this.node.name = '_header'
    this.node.resize(100, 48)
    this.node.fills = []

    // layout
    this.node.layoutMode = 'HORIZONTAL'
    this.node.primaryAxisSizingMode = 'AUTO'
    this.node.counterAxisSizingMode = 'AUTO'

    // insert
    this.node.appendChild(
      new Sample(
        'Source colors',
        null,
        null,
        [255, 255, 255],
        this.parent.properties,
        this.parent.textColorsTheme,
        this.parent.view
      ).makeNodeName('ABSOLUTE', 160, 48)
    )
    if (this.parent.view.includes('PALETTE')) 
      Object.values(this.parent.scale)
        .reverse()
        .forEach((lightness) => {
          this.node.appendChild(
            new Sample(
              Object.keys(this.parent.scale)
                .find((key) => this.parent.scale[key] === lightness)
                .substr(10),
              null,
              null,
              [255, 255, 255],
              this.parent.properties,
              this.parent.textColorsTheme,
              this.parent.view
            ).makeNodeName('ABSOLUTE', 160, 48)
          )
        })

    return this.node
  }
}
