import type {
  Service,
  SourceColorConfiguration,
  ColorConfiguration,
  PresetConfiguration,
  TextColorsThemeHexModel,
  PaletteNode,
  ScaleConfiguration,
  ThemeConfiguration,
  ColorSpaceConfiguration,
  ViewConfiguration,
  AlgorithmVersionConfiguration,
  visionSimulationModeConfiguration,
} from '../utils/types'
import Colors from './Colors'
import { locals, lang } from '../content/locals'
import { uid } from 'uid'

export default class Palette {
  sourceColors: Array<SourceColorConfiguration>
  name: string
  description: string
  frameName: string
  scale: ScaleConfiguration
  colors: Array<ColorConfiguration>
  colorSpace: ColorSpaceConfiguration
  visionSimulationMode: visionSimulationModeConfiguration
  themes: Array<ThemeConfiguration>
  preset: PresetConfiguration
  view: ViewConfiguration
  textColorsTheme: TextColorsThemeHexModel
  algorithmVersion: AlgorithmVersionConfiguration
  service: Service
  node: FrameNode | null

  constructor(
    sourceColors: Array<SourceColorConfiguration>,
    name: string,
    description: string,
    preset: PresetConfiguration,
    scale: ScaleConfiguration,
    colorSpace: ColorSpaceConfiguration,
    visionSimulationMode: visionSimulationModeConfiguration,
    view: ViewConfiguration,
    textColorsTheme: TextColorsThemeHexModel,
    algorithmVersion: AlgorithmVersionConfiguration
  ) {
    this.sourceColors = sourceColors
    this.name = name
    this.description = description
    this.frameName = `${name === '' ? locals[lang].name : name}﹒${
      preset.name
    }﹒${colorSpace} ${view.includes('PALETTE') ? 'Palette' : 'Sheet'}`
    this.preset = preset
    this.scale = scale
    this.colors = []
    this.colorSpace = colorSpace
    this.visionSimulationMode = visionSimulationMode
    ;(this.themes = [
      {
        name: locals[lang].themes.switchTheme.defaultTheme,
        description: '',
        scale: this.scale,
        paletteBackground: '#FFFFFF',
        isEnabled: true,
        id: '00000000000',
        type: 'default theme',
      },
    ]),
      (this.view = view)
    this.algorithmVersion = algorithmVersion
    this.textColorsTheme = textColorsTheme
    this.service = 'CREATE'
    this.node = null
  }

  makeNode = () => {
    // base
    this.node = figma.createFrame()
    this.node.name = this.frameName
    this.node.resize(1640, 100)
    this.node.cornerRadius = 16

    // layout
    this.node.layoutMode = 'VERTICAL'
    this.node.layoutSizingHorizontal = 'HUG'
    this.node.layoutSizingVertical = 'HUG'
    this.node.paddingTop =
      this.node.paddingRight =
      this.node.paddingBottom =
      this.node.paddingLeft =
        32

    // data
    this.node.setRelaunchData({ edit: '' })
    this.node.setPluginData('id', uid())
    this.node.setPluginData('type', 'UI_COLOR_PALETTE')
    this.node.setPluginData('name', this.name)
    this.node.setPluginData('description', this.description)
    this.node.setPluginData('preset', JSON.stringify(this.preset))
    this.node.setPluginData('scale', JSON.stringify(this.scale))
    this.node.setPluginData('colorSpace', this.colorSpace)
    this.node.setPluginData('visionSimulationMode', this.visionSimulationMode)
    this.node.setPluginData('themes', JSON.stringify(this.themes))
    this.node.setPluginData('view', this.view)
    this.node.setPluginData(
      'textColorsTheme',
      JSON.stringify(this.textColorsTheme)
    )
    this.node.setPluginData('algorithmVersion', this.algorithmVersion)

    // insert
    this.sourceColors.forEach((sourceColor) =>
      this.colors.push({
        name: sourceColor.name,
        description: '',
        rgb: sourceColor.rgb,
        id: uid(),
        oklch: false,
        hueShifting: 0,
      })
    )

    this.colors.sort((a, b) => {
      if (a.name.localeCompare(b.name) > 0) return 1
      else if (a.name.localeCompare(b.name) < 0) return -1
      else return 0
    })

    this.node.appendChild(new Colors(this as PaletteNode, this.node).makeNode())

    this.node.setPluginData('colors', JSON.stringify(this.colors))
    return this.node
  }
}
