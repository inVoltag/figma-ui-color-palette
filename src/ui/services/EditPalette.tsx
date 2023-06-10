import * as React from 'react'
import chroma from 'chroma-js'
import JSZip from 'JSZip'
import FileSaver from 'file-saver'
import type {
  ColorsMessage,
  PresetConfiguration,
  TextColorsThemeHexModel,
  ColorConfiguration,
  ExportConfiguration,
  HoveredColor,
  SelectedColor,
  DispatchProcess,
  ActionsList,
  ScaleConfiguration
} from '../../utils/types'
import Dispatcher from '../modules/Dispatcher'
import Feature from '../components/Feature'
import Tabs from '../components/Tabs'
import Scale from '../modules/Scale'
import Colors from '../modules/Colors'
import Export from '../modules/Export'
import Settings from '../modules/Settings'
import About from '../modules/About'
import Actions from '../modules/Actions'
import Shortcuts from '../modules/Shortcuts'
import { palette } from '../../utils/palettePackage'
import features from '../../utils/features'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  paletteName: string
  preset: PresetConfiguration
  scale: ScaleConfiguration
  colors: Array<ColorConfiguration>
  view: string
  textColorsTheme: TextColorsThemeHexModel
  algorithmVersion: string
  export: ExportConfiguration
  planStatus: string
  onReopenHighlight: React.ChangeEventHandler
  onChangeScale: () => void
  onChangeStop: () => void
  onChangeColor: (colors: Array<ColorConfiguration>) => void
  onChangeView: (view: string) => void
  onChangeSettings: React.ChangeEventHandler
}

const colorsMessage: ColorsMessage = {
  type: 'UPDATE_COLORS',
  data: [],
  isEditedInRealTime: false,
}

export default class EditPalette extends React.Component<Props> {
  dispatch: { [key: string]: DispatchProcess }

  constructor(props) {
    super(props)
    this.dispatch = {
      scale: new Dispatcher(
        () =>
          parent.postMessage(
            {
              pluginMessage: {
                type: 'UPDATE_SCALE',
                data: palette,
                isEditedInRealTime: true,
              },
            },
            '*'
          ),
        500
      ),
      colors: new Dispatcher(
        () => parent.postMessage({ pluginMessage: colorsMessage }, '*'),
        500
      ),
    }
    this.state = {
      selectedElement: {
        id: '',
        position: null,
      },
      hoveredElement: {
        id: '',
        hasGuideAbove: false,
        hasGuideBelow: false,
        position: null,
      },
      context:
        features.filter(
          (feature) =>
            feature.type === 'CONTEXT' &&
            feature.service.includes('edit') &&
            feature.isActive
        )[0] != undefined
          ? features
              .filter(
                (feature) =>
                  feature.type === 'CONTEXT' &&
                  feature.service.includes('edit') &&
                  feature.isActive
              )[0]
              .name.charAt(0) +
            features
              .filter(
                (feature) =>
                  feature.type === 'CONTEXT' &&
                  feature.service.includes('edit') &&
                  feature.isActive
              )[0]
              .name.slice(1)
              .toLowerCase()
          : '',
    }
  }

  // Handlers
  slideHandler = (e: string) => {
    if (e === 'released') {
      this.dispatch.scale.on.status = false
      parent.postMessage(
        {
          pluginMessage: {
            type: 'UPDATE_SCALE',
            data: palette,
            isEditedInRealTime: false,
          },
        },
        '*'
      )
      this.props.onChangeScale()
    } else if (e === 'customized') {
      parent.postMessage(
        {
          pluginMessage: {
            type: 'UPDATE_SCALE',
            data: palette,
            isEditedInRealTime: false,
          },
        },
        '*'
      )
      this.props.onChangeStop()
    } else this.dispatch.scale.on.status = true
  }

  colorHandler = (e) => {
    let id: string
    const element: HTMLElement | null = e.nativeEvent.path.filter((el) => {
      if (el.classList != undefined)
        return el.classList.contains('colors__item')
    })[0]

    element != undefined ? (id = element.getAttribute('data-id')) : null

    colorsMessage.isEditedInRealTime = false

    const updateHexCode = () => {
      const code: string =
        e.target.value.indexOf('#') == -1
          ? '#' + e.target.value
          : e.target.value
      if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(code)) {
        colorsMessage.data = this.props.colors.map((item) => {
          const rgb = chroma(
            e.target.value.indexOf('#') == -1
              ? '#' + e.target.value
              : e.target.value
          )._rgb
          if (item.id === id)
            item.rgb = {
              r: rgb[0] / 255,
              g: rgb[1] / 255,
              b: rgb[2] / 255,
            }
          return item
        })
        this.props.onChangeColor(colorsMessage.data)
      }
      if (e._reactName === 'onBlur') {
        this.dispatch.colors.on.status = false
        parent.postMessage({ pluginMessage: colorsMessage }, '*')
      } else {
        colorsMessage.isEditedInRealTime = true
        this.dispatch.colors.on.status = true
      }
    }

    const updateLightnessProp = () => {
      colorsMessage.data = this.props.colors.map((item) => {
        const rgb = chroma(
          item.rgb.r * 255,
          item.rgb.g * 255,
          item.rgb.b * 255
        ).set('lch.l', e.target.value)._rgb
        if (item.id === id)
          item.rgb = {
            r: rgb[0] / 255,
            g: rgb[1] / 255,
            b: rgb[2] / 255,
          }
        return item
      })
      this.props.onChangeColor(colorsMessage.data)
      parent.postMessage({ pluginMessage: colorsMessage }, '*')
    }

    const updateChromaProp = () => {
      colorsMessage.data = this.props.colors.map((item) => {
        const rgb = chroma(
          item.rgb.r * 255,
          item.rgb.g * 255,
          item.rgb.b * 255
        ).set('lch.c', e.target.value)._rgb
        if (item.id === id)
          item.rgb = {
            r: rgb[0] / 255,
            g: rgb[1] / 255,
            b: rgb[2] / 255,
          }
        return item
      })
      this.props.onChangeColor(colorsMessage.data)
      parent.postMessage({ pluginMessage: colorsMessage }, '*')
    }

    const updateHueProp = () => {
      colorsMessage.data = this.props.colors.map((item) => {
        const rgb = chroma(
          item.rgb.r * 255,
          item.rgb.g * 255,
          item.rgb.b * 255
        ).set('lch.h', e.target.value)._rgb
        if (item.id === id)
          item.rgb = {
            r: rgb[0] / 255,
            g: rgb[1] / 255,
            b: rgb[2] / 255,
          }
        return item
      })
      this.props.onChangeColor(colorsMessage.data)
      parent.postMessage({ pluginMessage: colorsMessage }, '*')
    }

    const addColor = () => {
      colorsMessage.data = this.props.colors
      const hasAlreadyNewUIColor = colorsMessage.data.filter((color) =>
        color.name.includes('New UI Color')
      )
      colorsMessage.data.push({
        name: `New UI Color ${hasAlreadyNewUIColor.length + 1}`,
        rgb: {
          r: 0.53,
          g: 0.92,
          b: 0.97,
        },
        id: uuidv4(),
        oklch: false,
        hueShifting: 0,
      })
      this.props.onChangeColor(colorsMessage.data)
      parent.postMessage({ pluginMessage: colorsMessage }, '*')
    }

    const removeColor = () => {
      colorsMessage.data = this.props.colors.filter((item) => item.id != id)
      this.props.onChangeColor(colorsMessage.data)
      parent.postMessage({ pluginMessage: colorsMessage }, '*')
    }

    const renameColor = () => {
      const hasSameName = this.props.colors.filter(
        (color) => color.name === e.target.value
      )
      colorsMessage.data = this.props.colors.map((item) => {
        if (item.id === id)
          item.name =
            hasSameName.length > 1 ? e.target.value + ' 2' : e.target.value
        return item
      })
      this.props.onChangeColor(colorsMessage.data)
      if (e._reactName === 'onBlur')
        parent.postMessage({ pluginMessage: colorsMessage }, '*')
      if (e.key === 'Enter')
        parent.postMessage({ pluginMessage: colorsMessage }, '*')
    }

    const enableOklch = () => {
      colorsMessage.data = this.props.colors.map((item) => {
        if (item.id === id) item.oklch = e.target.checked
        return item
      })
      this.props.onChangeColor(colorsMessage.data)
      parent.postMessage({ pluginMessage: colorsMessage }, '*')
    }

    const setHueShifting = () => {
      colorsMessage.data = this.props.colors.map((item) => {
        if (item.id === id) item.hueShifting = parseFloat(e.target.value)
        return item
      })
      this.props.onChangeColor(colorsMessage.data)
      parent.postMessage({ pluginMessage: colorsMessage }, '*')
    }

    const actions: ActionsList = {
      HEX: () => updateHexCode(),
      LIGHTNESS: () => updateLightnessProp(),
      CHROMA: () => updateChromaProp(),
      HUE: () => updateHueProp(),
      ADD: () => addColor(),
      REMOVE: () => removeColor(),
      RENAME: () => renameColor(),
      OKLCH: () => enableOklch(),
      SHIFT_HUE: () => setHueShifting(),
    }

    return actions[e.target.dataset.feature]?.()
  }

  orderHandler = () => {
    const source: SelectedColor = this.state['selectedElement'],
      target: HoveredColor = this.state['hoveredElement'],
      colors = this.props.colors.map((el) => el)

    let position: number

    const colorsWithoutSource = colors.splice(source.position, 1)[0]

    if (target.hasGuideAbove && target.position > source.position)
      position = target.position - 1
    else if (target.hasGuideBelow && target.position > source.position)
      position = target.position
    else if (target.hasGuideAbove && target.position < source.position)
      position = target.position
    else if (target.hasGuideBelow && target.position < source.position)
      position = target.position + 1
    else position = target.position

    colors.splice(position, 0, colorsWithoutSource)
    this.props.onChangeColor(colors)
    parent.postMessage(
      {
        pluginMessage: {
          type: 'UPDATE_COLORs',
          data: colors,
          isEditedInRealTime: false,
        },
      },
      '*'
    )
  }

  selectionHandler = (e) => {
    const target = e.currentTarget
    if (target !== e.target) return
    this.setState({
      selectedElement: {
        id: target.dataset.id,
        position: target.dataset.position,
      },
    })
  }

  unSelectColor = (e) => {
    e.target.closest('li.colors__item') == null
      ? this.setState({
          selectedElement: {
            id: '',
            position: null,
          },
        })
      : null
  }

  dragHandler = (
    id: string,
    hasGuideAbove: boolean,
    hasGuideBelow: boolean,
    position: number
  ) => {
    this.setState({
      hoveredElement: {
        id: id,
        hasGuideAbove: hasGuideAbove,
        hasGuideBelow: hasGuideBelow,
        position: position,
      },
    })
  }

  dropOutsideHandler = (e) => {
    const target = e.target,
      parent: ParentNode = target.parentNode,
      scrollY: number = (parent.parentNode.parentNode as HTMLElement).scrollTop,
      parentRefTop: number = (parent as HTMLElement).offsetTop,
      parentRefBottom: number =
        parentRefTop + (parent as HTMLElement).clientHeight

    if (e.pageY + scrollY < parentRefTop) this.orderHandler()
    else if (e.pageY + scrollY > parentRefBottom) this.orderHandler()
  }

  settingsHandler = (e) => this.props.onChangeSettings(e)

  navHandler = (e: React.SyntheticEvent) =>
  this.setState({
    context: (e.target as HTMLElement).innerText,
  })

  viewHandler = (e) => {
    if (e.target.dataset.isBlocked === 'false') {
      this.props.onChangeView(e.target.dataset.value)
      palette.view = e.target.dataset.value
      parent.postMessage(
        { pluginMessage: { type: 'UPDATE_VIEW', data: palette } },
        '*'
      )
      this.setState({
        selectedElement: {
          id: '',
          position: null,
        },
      })
    }
  }

  // Direct actions
  onCreate = () => {
    parent.postMessage(
      { pluginMessage: { type: 'CREATE_LOCAL_STYLES', data: palette } },
      '*'
    )
    this.setState({
      selectedElement: {
        id: '',
        position: null,
      },
    })
  }

  onUpdate = () => {
    parent.postMessage(
      { pluginMessage: { type: 'UPDATE_LOCAL_STYLES', data: palette } },
      '*'
    )
    this.setState({
      selectedElement: {
        id: '',
        position: null,
      },
    })
  }

  onExport = () => {
    if (this.props.export.format === 'CSV') {
      const zip = new JSZip()
      this.props.export.data.forEach((item) =>
        zip.file(
          `${item.name.toLowerCase().replace(' ', '_').replace('/', '-')}.csv`,
          item.csv
        )
      )
      zip
        .generateAsync({ type: 'blob' })
        .then((content) => FileSaver.saveAs(content, 'colors'))
        .catch((error) => console.error(error))
    } else {
      const blob = new Blob([this.props.export.data], {
        type: this.props.export.mimeType,
      })
      FileSaver.saveAs(blob, 'colors')
    }
  }

  setPrimaryContexts = () => {
    const contexts: Array<string> = []
    if (features.find((feature) => feature.name === 'SCALE').isActive)
      contexts.push('Scale')
    if (features.find((feature) => feature.name === 'COLORS').isActive)
      contexts.push('Colors')
    if (features.find((feature) => feature.name === 'EXPORT').isActive)
      contexts.push('Export')
    if (features.find((feature) => feature.name === 'SETTINGS').isActive)
      contexts.push('Settings')
    return contexts
  }

  setSecondaryContexts = () => {
    const contexts: Array<string> = []
    if (features.find((feature) => feature.name === 'ABOUT').isActive)
      contexts.push('About')
    return contexts
  }

  // Render
  render() {
    let actions, controls, help

    if (this.state['context'] === 'Export') {
      actions = (
        <Actions
          context="export"
          exportType={this.props.export.format}
          onExportPalette={this.onExport}
        />
      )

      help = (
        <Feature
          isActive={
            features.find((feature) => feature.name === 'SHORTCUTS').isActive
          }
        >
          <Shortcuts
            actions={[
              {
                label: 'Read the documentation',
                isLink: true,
                url: 'https://docs.ui-color-palette.com',
                action: null,
              },
              {
                label: 'Give feedback',
                isLink: true,
                url: 'https://uicp.link/feedback',
                action: null,
              },
              {
                label: "What's new",
                isLink: false,
                url: '',
                action: this.props.onReopenHighlight,
              },
            ]}
            planStatus={this.props.planStatus}
          />
        </Feature>
      )
    } else if (this.state['context'] === 'About') {
      actions = help = null
    } else {
      actions = (
        <Actions
          context="edit"
          view={this.props.view}
          planStatus={this.props.planStatus}
          onCreateLocalColors={this.onCreate}
          onUpdateLocalColors={this.onUpdate}
          onChangeView={this.viewHandler}
        />
      )

      help = (
        <Feature
          isActive={
            features.find((feature) => feature.name === 'SHORTCUTS').isActive
          }
        >
          <Shortcuts
            actions={[
              {
                label: 'Read the documentation',
                isLink: true,
                url: 'https://docs.ui-color-palette.com',
                action: null,
              },
              {
                label: 'Give feedback',
                isLink: true,
                url: 'https://uicp.link/feedback',
                action: null,
              },
              {
                label: "What's new",
                isLink: false,
                url: '',
                action: this.props.onReopenHighlight,
              },
            ]}
            planStatus={this.props.planStatus}
          />
        </Feature>
      )
    }

    switch (this.state['context']) {
      case 'Scale': {
        controls = (
          <Scale
            hasPreset={false}
            preset={this.props.preset}
            scale={this.props.scale}
            onChangeScale={this.slideHandler}
          />
        )
        break
      }
      case 'Colors': {
        controls = (
          <Colors
            colors={this.props.colors}
            selectedElement={this.state['selectedElement']}
            hoveredElement={this.state['hoveredElement']}
            onChangeColor={this.colorHandler}
            onAddColor={this.colorHandler}
            onChangeSelection={this.selectionHandler}
            onDragChange={this.dragHandler}
            onDropOutside={this.dropOutsideHandler}
            onChangeOrder={this.orderHandler}
          />
        )
        break
      }
      case 'Export': {
        controls = (
          <Export
            exportPreview={
              this.props.export.format === 'CSV'
                ? this.props.export.data[0].csv
                : this.props.export.data
            }
            planStatus={this.props.planStatus}
          />
        )
        break
      }
      case 'Settings': {
        controls = (
          <Settings
            paletteName={this.props.paletteName}
            textColorsTheme={this.props.textColorsTheme}
            settings={['base', 'contrast-management', 'color-management']}
            isNewAlgorithm={this.props.algorithmVersion == 'v2' ? true : false}
            planStatus={this.props.planStatus}
            onChangeSettings={this.settingsHandler}
          />
        )
        break
      }
      case 'About': {
        controls =
        <About
          planStatus={this.props.planStatus}
        />
      }
    }

    return (
      <>
        <Tabs
          primaryTabs={this.setPrimaryContexts()}
          secondaryTabs={this.setSecondaryContexts()}
          active={this.state['context']}
          action={this.navHandler}
        />
        <section
          onMouseDown={this.unSelectColor}
          className="section--scrollable"
        >
          <div className="controls">{controls}</div>
        </section>
        {actions}
        {help}
      </>
    )
  }
}
