import * as React from 'react'
import chroma from 'chroma-js'
import { uid } from 'uid'
import type {
  EditorType,
  Language,
  SourceColorConfiguration,
  ThirdParty,
} from '../../utils/types'
import Feature from '../components/Feature'
import { Message } from '@a-ng-d/figmug.dialogs.message'
import Actions from './Actions'
import { FormItem } from '@a-ng-d/figmug.layouts.form-item'
import { Input } from '@a-ng-d/figmug.inputs.input'
import { Button } from '@a-ng-d/figmug.actions.button'
import CompactColorItem from '../components/CompactColorItem'
import { Accordion } from '@a-ng-d/figmug.layouts.accordion'
import { texts } from '@a-ng-d/figmug.stylesheets.texts'
import features from '../../utils/config'
import isBlocked from '../../utils/isBlocked'
import { locals } from '../../content/locals'

interface Props {
  sourceColors: Array<SourceColorConfiguration>
  planStatus: 'UNPAID' | 'PAID'
  editorType?: EditorType
  lang: Language
  onChangeColorsFromImport: (
    onChangeColorsFromImport: Array<SourceColorConfiguration>,
    source: ThirdParty
  ) => void
  onCreatePalette: () => void
}

export default class Source extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {
      coolorsUrl: {
        value: '' as string,
        state: 'DEFAULT' as 'DEFAULT' | 'ERROR',
        canBeSubmitted: false,
        helper: undefined,
      },
      isCoolorsImportOpen: false,
      realtimeColorsUrl: {
        value: '' as string,
        state: 'DEFAULT' as 'DEFAULT' | 'ERROR',
        canBeSubmitted: false,
        helper: undefined,
      },
      isRealtimeColorsImportOpen: false,
    }
  }

  componentWillUnmount(): void {
    this.setState({
      coolorsUrl: {
        value: '',
        state: 'DEFAULT',
        canBeSubmitted: false,
        helper: undefined,
      },
    })
  }

  // Handlers
  isTypingCoolorsUrlHandler = (e: React.SyntheticEvent) =>
    this.setState((state: any) => ({
      coolorsUrl: {
        value: (e.target as HTMLInputElement).value,
        state: !(e.target as HTMLInputElement).value.includes(
          'https://coolors.co'
        )
          ? ''
          : state['coolorsUrl'].state,
        canBeSubmitted: (e.target as HTMLInputElement).value.includes(
          'https://coolors.co'
        )
          ? true
          : false,
        helper: !(e.target as HTMLInputElement).value.includes(
          'https://coolors.co'
        )
          ? undefined
          : state['coolorsUrl'].helper,
      },
    }))

  isTypingRealtimeColorsUrlHandler = (e: React.SyntheticEvent) =>
    this.setState((state: any) => ({
      realtimeColorsUrl: {
        value: (e.target as HTMLInputElement).value,
        state: !(e.target as HTMLInputElement).value.includes(
          'https://www.realtimecolors.com'
        )
          ? ''
          : state['realtimeColorsUrl'].state,
        canBeSubmitted: (e.target as HTMLInputElement).value.includes(
          'https://www.realtimecolors.com'
        )
          ? true
          : false,
        helper: !(e.target as HTMLInputElement).value.includes(
          'https://www.realtimecolors.com'
        )
          ? undefined
          : state['realtimeColorsUrl'].helper,
      },
    }))

  importColorsFromCoolorsHandler = () => {
    const url: string = this.state['coolorsUrl'].value,
      hexs: string | undefined = url.split('/').at(-1)

    if (hexs != undefined)
      if (/^(?:[0-9a-fA-F]{6}-)+[0-9a-fA-F]{6}$/i.test(hexs)) {
        this.props.onChangeColorsFromImport(
          hexs.split('-').map((hex) => {
            const gl = chroma(hex).gl()
            return {
              name: hex,
              rgb: {
                r: gl[0],
                g: gl[1],
                b: gl[2],
              },
              source: 'COOLORS',
              id: uid(),
            }
          }), 'COOLORS'
        )
        this.setState({
          coolorsUrl: {
            value: '',
            state: 'DEFAULT',
            canBeSubmitted: false,
            helper: undefined,
          },
        })
      } else
        this.setState({
          coolorsUrl: {
            value: this.state['coolorsUrl'].value,
            state: 'ERROR',
            canBeSubmitted: this.state['coolorsUrl'].canBeSubmitted,
            helper: {
              type: 'ERROR',
              message: locals[this.props.lang].source.coolors.url.errorMessage,
            },
          },
        })
  }

  importColorsFromRealtimeColorsHandler = () => {
    const url: string = this.state['realtimeColorsUrl'].value,
      hexs: string | undefined = url.split('/').at(-1)?.split('&')[0].replace('?colors=', '')

    if (hexs != undefined)
      if (/^(?:[0-9a-fA-F]{6}-)+[0-9a-fA-F]{6}$/i.test(hexs)) {
        this.props.onChangeColorsFromImport(
          hexs.split('-').map((hex) => {
            const gl = chroma(hex).gl()
            return {
              name: hex,
              rgb: {
                r: gl[0],
                g: gl[1],
                b: gl[2],
              },
              source: 'REALTIME_COLORS',
              id: uid(),
            }
          }), 'REALTIME_COLORS'
        )
        this.setState({
          realtimeColorsUrl: {
            value: '',
            state: 'DEFAULT',
            canBeSubmitted: false,
            helper: undefined,
          },
        })
      } else
        this.setState({
          realtimeColorsUrl: {
            value: this.state['realtimeColorsUrl'].value,
            state: 'ERROR',
            canBeSubmitted: this.state['realtimeColorsUrl'].canBeSubmitted,
            helper: {
              type: 'ERROR',
              message: locals[this.props.lang].source.coolors.url.errorMessage,
            },
          },
        })
  }

  // Templates
  SelectedColors = () => {
    return (
      <>
        <div className="section-controls">
          <div className="section-controls__left-part">
            <div className={`section-title ${texts['section-title']}`}>
              {locals[this.props.lang].source.canvas.title}
            </div>
            <div className={`type ${texts.type}`}>{`(${
              this.props.sourceColors.filter(
                (sourceColor) => sourceColor.source === 'CANVAS'
              ).length
            })`}</div>
          </div>
          <div className="section-controls__right-part"></div>
        </div>
        {this.props.sourceColors.filter(
          (sourceColor) => sourceColor.source === 'CANVAS'
        ).length > 0 ? (
          <ul className="list">
            {this.props.sourceColors
              .filter((sourceColor) => sourceColor.source === 'CANVAS')
              .map((sourceColor) => {
                return (
                  <CompactColorItem
                    key={sourceColor.id}
                    name={sourceColor.name}
                    hex={chroma(
                      sourceColor.rgb.r * 255,
                      sourceColor.rgb.g * 255,
                      sourceColor.rgb.b * 255
                    )
                      .hex()
                      .toUpperCase()}
                    uuid={sourceColor.id}
                    lang={this.props.lang}
                  />
                )
              })}
          </ul>
        ) : (
          <Message
            icon="list-tile"
            messages={[locals[this.props.lang].source.canvas.tip]}
          />
        )}
      </>
    )
  }

  CoolorsColors = () => {
    return (
      <>
        <Accordion
          label={locals[this.props.lang].source.coolors.title}
          indicator={
            this.props.sourceColors.filter(
              (sourceColor) => sourceColor.source === 'COOLORS'
            ).length
          }
          itemHandler={this.state['isCoolorsImportOpen'] ? 'REMOVE' : 'ADD'}
          isExpanded={this.state['isCoolorsImportOpen']}
          isBlocked={isBlocked('SOURCE_COOLORS', this.props.planStatus)}
          isNew={
            features.find((feature) => feature.name === 'SOURCE_COOLORS')?.isNew
          }
          onAdd={() => {
            this.setState({ isCoolorsImportOpen: true })
          }}
          onEmpty={() => {
            this.props.onChangeColorsFromImport([], 'COOLORS')
            this.setState({
              isCoolorsImportOpen: false,
              coolorsUrl: {
                value: '',
                state: 'DEFAULT',
                canBeSubmitted: false,
                helper: undefined,
              },
            })
          }}
        >
          <div className="settings__item">
            <FormItem
              id="coolors-palette-urn"
              label={locals[this.props.lang].source.coolors.url.label}
              helper={this.state['coolorsUrl'].helper}
              shouldFill={false}
            >
              <Input
                type="TEXT"
                state={this.state['coolorsUrl'].state}
                placeholder={
                  locals[this.props.lang].source.coolors.url.placeholder
                }
                value={this.state['coolorsUrl'].value}
                onChange={this.isTypingCoolorsUrlHandler}
                onConfirm={() => {
                  if (this.state['coolorsUrl'].canBeSubmitted) {
                    this.importColorsFromCoolorsHandler()
                  }
                }}
                onBlur={() => {
                  if (this.state['coolorsUrl'].canBeSubmitted) {
                    this.importColorsFromCoolorsHandler()
                  }
                }}
              />
            </FormItem>
          </div>
          <ul className="list">
            {this.props.sourceColors
              .filter((sourceColor) => sourceColor.source === 'COOLORS')
              .map((sourceColor) => {
                return (
                  <CompactColorItem
                    key={sourceColor.id}
                    name={sourceColor.name}
                    hex={chroma(
                      sourceColor.rgb.r * 255,
                      sourceColor.rgb.g * 255,
                      sourceColor.rgb.b * 255
                    )
                      .hex()
                      .toUpperCase()}
                    uuid={sourceColor.id}
                    lang={this.props.lang}
                  />
                )
              })}
          </ul>
        </Accordion>
      </>
    )
  }

  RealtimeColorsColors = () => {
    return (
      <>
        <Accordion
          label={locals[this.props.lang].source.realtimeColors.title}
          indicator={
            this.props.sourceColors.filter(
              (sourceColor) => sourceColor.source === 'REALTIME_COLORS'
            ).length
          }
          itemHandler={this.state['isRealtimeColorsImportOpen'] ? 'REMOVE' : 'ADD'}
          isExpanded={this.state['isRealtimeColorsImportOpen']}
          isBlocked={isBlocked('SOURCE_REALTIME_COLORS', this.props.planStatus)}
          isNew={
            features.find((feature) => feature.name === 'SOURCE_REALTIME_COLORS')?.isNew
          }
          onAdd={() => {
            this.setState({ isRealtimeColorsImportOpen: true })
          }}
          onEmpty={() => {
            this.props.onChangeColorsFromImport([], 'REALTIME_COLORS')
            this.setState({
              isRealtimeColorsImportOpen: false,
              realtimeColorsUrl: {
                value: '',
                state: 'DEFAULT',
                canBeSubmitted: false,
                helper: undefined,
              },
            })
          }}
        >
          <div className="settings__item">
            <FormItem
              id="realtime-colors-url"
              label={locals[this.props.lang].source.realtimeColors.url.label}
              helper={this.state['realtimeColorsUrl'].helper}
              shouldFill={false}
            >
              <Input
                type="TEXT"
                state={this.state['realtimeColorsUrl'].state}
                placeholder={
                  locals[this.props.lang].source.realtimeColors.url.placeholder
                }
                value={this.state['realtimeColorsUrl'].value}
                onChange={this.isTypingRealtimeColorsUrlHandler}
                onConfirm={() => {
                  if (this.state['realtimeColorsUrl'].canBeSubmitted) {
                    this.importColorsFromRealtimeColorsHandler()
                  }
                }}
                onBlur={() => {
                  if (this.state['realtimeColorsUrl'].canBeSubmitted) {
                    this.importColorsFromRealtimeColorsHandler()
                  }
                }}
              />
            </FormItem>
          </div>
          <ul className="list">
            {this.props.sourceColors
              .filter((sourceColor) => sourceColor.source === 'REALTIME_COLORS')
              .map((sourceColor) => {
                return (
                  <CompactColorItem
                    key={sourceColor.id}
                    name={sourceColor.name}
                    hex={chroma(
                      sourceColor.rgb.r * 255,
                      sourceColor.rgb.g * 255,
                      sourceColor.rgb.b * 255
                    )
                      .hex()
                      .toUpperCase()}
                    uuid={sourceColor.id}
                    lang={this.props.lang}
                  />
                )
              })}
          </ul>
        </Accordion>
      </>
    )
  }

  // Render
  render() {
    return (
      <>
        <div className="controls__control controls__control--horizontal">
          <div className="control__block control__block--list">
            <Feature
              isActive={
                features.find((feature) => feature.name === 'SOURCE_CANVAS')
                  ?.isActive
              }
            >
              <this.SelectedColors />
            </Feature>
          </div>
          <div className="control__block control__block--no-padding">
            <Feature
              isActive={
                features.find((feature) => feature.name === 'SOURCE_COOLORS')
                  ?.isActive
              }
            >
              <this.CoolorsColors />
            </Feature>
            <Feature
              isActive={
                features.find((feature) => feature.name === 'SOURCE_REALTIME_COLORS')
                  ?.isActive
              }
            >
              <this.RealtimeColorsColors />
            </Feature>
          </div>
        </div>
        <Actions
          context="CREATE"
          sourceColors={this.props.sourceColors}
          planStatus={this.props.planStatus}
          lang={this.props.lang}
          onCreatePalette={
            this.props.sourceColors.length > 0
              ? this.props.onCreatePalette
              : () => null
          }
        />
      </>
    )
  }
}
