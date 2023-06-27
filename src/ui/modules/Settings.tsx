import * as React from 'react'
import type { TextColorsThemeHexModel } from '../../utils/types'
import Feature from '../components/Feature'
import FormItem from './../components/FormItem'
import Input from './../components/Input'
import Switch from '../components/Switch'
import Message from '../components/Message'
import Dropdown from '../components/Dropdown'
import Shortcuts from './Shortcuts'
import Actions from './Actions'
import features from '../../utils/features'
import isBlocked from '../../utils/isBlocked'
import { locals } from '../../content/locals'

interface Props {
  context: string
  paletteName: string
  textColorsTheme?: TextColorsThemeHexModel
  colorSpace: string
  isNewAlgorithm?: boolean
  view: string
  planStatus: string
  editorType?: string
  lang: string
  onChangeSettings: React.ReactEventHandler
  onCreatePalette?: () => void
  onCreateLocalStyles?: () => void
  onUpdateLocalStyles?: () => void
  onChangeView: React.ChangeEventHandler
  onReopenHighlight: React.ChangeEventHandler
}

export default class Settings extends React.Component<Props> {
  // Templates
  PaletteName = () => {
    return (
      <Feature
        isActive={
          features.find((feature) => feature.name === 'SETTINGS_PALETTE_NAME')
            .isActive
        }
      >
        <div className="settings__item">
          <FormItem
            label={locals[this.props.lang].settings.base.name}
            id="rename-palette"
            isBlocked={isBlocked(
              'SETTINGS_PALETTE_NAME',
              this.props.planStatus
            )}
          >
            <Input
              id="rename-palette"
              type="text"
              icon={{ type: 'none', value: null }}
              placeholder={locals[this.props.lang].settings.base.defaultName}
              value={
                this.props.paletteName != '' ? this.props.paletteName : ''
              }
              charactersLimit={64}
              isBlocked={isBlocked(
                'SETTINGS_PALETTE_NAME',
                this.props.planStatus
              )}
              feature="RENAME_PALETTE"
              onChange={
                isBlocked('SETTINGS_PALETTE_NAME', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
              onFocus={
                isBlocked('SETTINGS_PALETTE_NAME', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
              onBlur={
                isBlocked('SETTINGS_PALETTE_NAME', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
              onConfirm={
                isBlocked('SETTINGS_PALETTE_NAME', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
            />
          </FormItem>
        </div>
      </Feature>
    )
  }

  colorSpace = () => {
    return (
      <Feature
        isActive={
          features.find(
            (feature) => feature.name === 'SETTINGS_COLOR_SPACE'
          ).isActive
        }
      >
        <div className="settings__item">
          <FormItem
            id="change-color-space"
            label={locals[this.props.lang].settings.color.colorSpace}
          >
            <Dropdown
              id="color-spaces"
              options={[
                {
                  label: locals[this.props.lang].settings.color.colorSpaceOptions.lch,
                  value: 'LCH',
                  position: 0,
                  isActive: features.find(
                    (feature) =>
                      feature.name === 'SETTINGS_COLOR_SPACE_LCH'
                  ).isActive,
                  isBlocked: isBlocked(
                    'SETTINGS_COLOR_SPACE_LCH',
                    this.props.planStatus
                  ),
                },
                {
                  label: locals[this.props.lang].settings.color.colorSpaceOptions.oklch,
                  value: 'OKLCH',
                  position: 1,
                  isActive: features.find(
                    (feature) =>
                      feature.name === 'SETTINGS_COLOR_SPACE_OKLCH'
                  ).isActive,
                  isBlocked: isBlocked(
                    'SETTINGS_COLOR_SPACE_OKLCH',
                    this.props.planStatus
                  ),
                },
                {
                  label: locals[this.props.lang].settings.color.colorSpaceOptions.lab,
                  value: 'LAB',
                  position: 2,
                  isActive: features.find(
                    (feature) =>
                      feature.name === 'SETTINGS_COLOR_SPACE_LAB'
                  ).isActive,
                  isBlocked: isBlocked(
                    'SETTINGS_COLOR_SPACE_LAB',
                    this.props.planStatus
                  ),
                },
                {
                  label: locals[this.props.lang].settings.color.colorSpaceOptions.oklab,
                  value: 'OKLAB',
                  position: 3,
                  isActive: features.find(
                    (feature) =>
                      feature.name === 'SETTINGS_COLOR_SPACE_OKLAB'
                  ).isActive,
                  isBlocked: isBlocked(
                    'SETTINGS_COLOR_SPACE_OKLAB',
                    this.props.planStatus
                  ),
                },
                {
                  label: locals[this.props.lang].settings.color.colorSpaceOptions.hsl,
                  value: 'HSL',
                  position: 4,
                  isActive: features.find(
                    (feature) =>
                      feature.name === 'SETTINGS_COLOR_SPACE_HSL'
                  ).isActive,
                  isBlocked: isBlocked(
                    'SETTINGS_COLOR_SPACE_HSL',
                    this.props.planStatus
                  ),
                },
              ]}
              selected={this.props.colorSpace}
              feature="UPDATE_COLOR_SPACE"
              onChange={this.props.onChangeSettings}
            />
          </FormItem>
          <Message
            icon="library"
            messages={[locals[this.props.lang].settings.color.colorSpaceOptionsDescription]}
            isBlocked={isBlocked(
              'SETTINGS_COLOR_SPACE',
              this.props.planStatus
            )}
          />
        </div>
      </Feature>
    )
  }

  newAlgorithm = () => {
    return (
      <Feature
        isActive={
          features.find(
            (feature) => feature.name === 'SETTINGS_NEW_ALGORITHM'
          ).isActive
        }
      >
        <div className="settings__item">
          <Switch
            id="update-algorithm"
            label={locals[this.props.lang].settings.color.newAlgorithm}
            isChecked={this.props.isNewAlgorithm}
            isBlocked={isBlocked(
              'SETTINGS_NEW_ALGORITHM',
              this.props.planStatus
            )}
            feature="UPDATE_ALGORITHM_VERSION"
            onChange={
              isBlocked('SETTINGS_NEW_ALGORITHM', this.props.planStatus)
                ? () => null
                : this.props.onChangeSettings
            }
          />
          <Message
            icon="library"
            messages={[locals[this.props.lang].settings.color.newAlgorithmDescription]}
            isBlocked={isBlocked(
              'SETTINGS_NEW_ALGORITHM',
              this.props.planStatus
            )}
          />
        </div>
      </Feature>
    )
  }

  textColorsTheme = () => {
    return (
      <Feature
        isActive={
          features.find(
            (feature) => feature.name === 'SETTINGS_TEXT_COLORS_THEME'
          ).isActive
        }
      >
        <div className="settings__item">
          <FormItem
            label={locals[this.props.lang].settings.contrast.textLightColor}
            id="change-text-light-color"
            isBlocked={isBlocked(
              'SETTINGS_TEXT_COLORS_THEME',
              this.props.planStatus
            )}
          >
            <Input
              id="change-text-light-color"
              type="color"
              icon={{ type: 'none', value: null }}
              value={this.props.textColorsTheme.lightColor}
              isBlocked={isBlocked(
                'SETTINGS_TEXT_COLORS_THEME',
                this.props.planStatus
              )}
              feature="CHANGE_TEXT_LIGHT_COLOR"
              onChange={
                isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
              onFocus={
                isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
              onBlur={
                isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
            />
          </FormItem>
          <FormItem
            label={locals[this.props.lang].settings.contrast.textDarkColor}
            id="change-text-dark-color"
            isBlocked={isBlocked(
              'SETTINGS_TEXT_COLORS_THEME',
              this.props.planStatus
            )}
          >
            <Input
              id="change-text-dark-color"
              type="color"
              icon={{ type: 'none', value: null }}
              value={this.props.textColorsTheme.darkColor}
              isBlocked={isBlocked(
                'SETTINGS_TEXT_COLORS_THEME',
                this.props.planStatus
              )}
              feature="CHANGE_TEXT_DARK_COLOR"
              onChange={
                isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
              onFocus={
                isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
              onBlur={
                isBlocked('SETTINGS_TEXT_COLORS_THEME', this.props.planStatus)
                  ? () => null
                  : this.props.onChangeSettings
              }
            />
          </FormItem>
          <Message
            icon="library"
            messages={[
              locals[this.props.lang].settings.contrast.textThemeColorsDescription,
            ]}
            isBlocked={isBlocked(
              'SETTINGS_NEW_ALGORITHM',
              this.props.planStatus
            )}
          />
        </div>
      </Feature>
    )
  }

  Base = () => {
    return (
      <div className="settings__group">
        <div className="section-controls">
          <div className="section-controls__left-part">
            <div className="section-title">{locals[this.props.lang].settings.base.title}</div>
          </div>
        </div>
        <this.PaletteName />
      </div>
    )
  }

  ColorManagement = () => {
    return (
      <div className="settings__group">
        <div className="section-controls">
          <div className="section-controls__left-part">
            <div className="section-title">
              {locals[this.props.lang].settings.color.title}
            </div>
          </div>
        </div>
        <this.colorSpace />
        {this.props.context === 'LOCAL_STYLES' ? <this.newAlgorithm /> : null}
      </div>
    )
  }

  ContrastManagement = () => {
    return (
      <div className="settings__group">
        <div className="section-controls">
          <div className="section-controls__left-part">
            <div className="section-title">
              {locals[this.props.lang].settings.contrast.title}
            </div>
          </div>
        </div>
        <this.textColorsTheme />
      </div>
    )
  }

  render() {
    return (
      <>
        <div className="settings controls__control">
          <this.Base />
          <this.ColorManagement />
          <this.ContrastManagement />
        </div>
        {this.props.context === 'CREATE' ? (
          <Actions
            context="CREATE"
            view={this.props.view}
            planStatus={this.props.planStatus}
            lang={this.props.lang}
            onCreatePalette={this.props.onCreatePalette}
            onChangeView={this.props.onChangeView}
          />
        ) : (
          <Actions
            context="LOCAL_STYLES"
            view={this.props.view}
            editorType={this.props.editorType}
            planStatus={this.props.planStatus}
            lang={this.props.lang}
            onCreateLocalStyles={this.props.onCreateLocalStyles}
            onUpdateLocalStyles={this.props.onUpdateLocalStyles}
            onChangeView={this.props.onChangeView}
          />
        )}
        <Feature
          isActive={
            features.find((feature) => feature.name === 'SHORTCUTS').isActive
          }
        >
          <Shortcuts
            actions={[
              {
                label: locals[this.props.lang].shortcuts.documentation,
                isLink: true,
                url: 'https://docs.ui-color-palette.com',
                action: null,
              },
              {
                label: locals[this.props.lang].shortcuts.feedback,
                isLink: true,
                url: 'https://uicp.link/feedback',
                action: null,
              },
              {
                label: locals[this.props.lang].shortcuts.news,
                isLink: false,
                url: '',
                action: this.props.onReopenHighlight,
              },
            ]}
            planStatus={this.props.planStatus}
            lang={this.props.lang}
          />
        </Feature>
      </>
    )
  }
}
