export default class Header {

  name: string;
  content: string;
  node: FrameNode;
  children: TextNode;

  constructor(name, content) {
    this.name = name
    this.content = content;
    this.node = figma.createFrame();
    this.children = figma.createText()
  }

  makeNode() {
    this.node.name = this.name;
    this.node.layoutMode = 'HORIZONTAL';
    this.node.counterAxisSizingMode = 'AUTO';
    this.node.paddingTop = this.node.paddingRight = this.node.paddingBottom = this.node.paddingLeft = 8;
    this.node.layoutGrow = 1;

    this.children.name = 'text';
    this.children.characters = this.content;
    this.children.fontSize = 10;
    this.children.textAlignHorizontal = 'CENTER';

    this.node.appendChild(this.children);

    return this.node
  }

}
