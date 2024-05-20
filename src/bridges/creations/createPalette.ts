import Palette from '../../canvas/Palette'
import type {
  ColorSpaceConfiguration,
  CreatorIdentity,
  DatesConfiguration,
  PresetConfiguration,
  PublicationStatus,
  ScaleConfiguration,
  SourceColorConfiguration,
  TextColorsThemeHexModel,
  ThemeConfiguration,
  ViewConfiguration,
  VisionSimulationModeConfiguration,
} from '../../utils/types'

interface Msg {
  data: {
    sourceColors: Array<SourceColorConfiguration>
    palette: {
      name: string
      description: string
      preset: PresetConfiguration
      scale: ScaleConfiguration
      colorSpace: ColorSpaceConfiguration
      visionSimulationMode: VisionSimulationModeConfiguration
      view: ViewConfiguration
      textColorsTheme: TextColorsThemeHexModel
    }
    themes?: Array<ThemeConfiguration>
    isRemote?: boolean
    paletteMeta?: {
      dates: DatesConfiguration,
      publicationStatus: PublicationStatus
      creatorIdentity: CreatorIdentity
    }
  }
}

const createPalette = (msg: Msg) => {
  const scene: SceneNode[] = []

  console.log(msg.data)

  const palette = new Palette(
    msg.data.sourceColors,
    msg.data.palette.name,
    msg.data.palette.description,
    msg.data.palette.preset,
    msg.data.palette.scale,
    msg.data.palette.colorSpace,
    msg.data.palette.visionSimulationMode,
    msg.data.palette.view,
    msg.data.palette.textColorsTheme,
    'v2',
    msg.data.themes,
    msg.data.isRemote,
    msg.data.paletteMeta
  ).makeNode()

  if (palette.children.length != 0) {
    figma.currentPage.appendChild(palette)
    scene.push(palette)
    palette.x = figma.viewport.center.x - palette.width / 2
    palette.y = figma.viewport.center.y - palette.height / 2
    figma.currentPage.selection = scene
    figma.viewport.scrollAndZoomIntoView(scene)
  } else palette.remove()
}

export default createPalette
