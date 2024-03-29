import * as React from 'react'
import type {
  EditorType,
  Language,
  PlanStatus,
  TrialStatus,
} from '../../utils/types'
import Feature from '../components/Feature'
import { Bar } from '@a-ng-d/figmug.layouts.bar'
import { Button } from '@a-ng-d/figmug.actions.button'
import { Menu } from '@a-ng-d/figmug.navigation.menu'
import { icons } from '@a-ng-d/figmug.stylesheets.icons'
import { texts } from '@a-ng-d/figmug.stylesheets.texts'
import features from '../../utils/config'
import { locals } from '../../content/locals'
import isBlocked from '../../utils/isBlocked'

interface Props {
  editorType: EditorType
  planStatus: PlanStatus
  trialStatus: TrialStatus
  trialRemainingTime: number
  lang: Language
  onReOpenFeedback: () => void
  onReOpenTrialFeedback: () => void
  onReOpenHighlight: () => void
  onReOpenAbout: () => void
  onGetProPlan: () => void
}

interface States {
  canBeResized: boolean
}

export default class Shortcuts extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props)
    this.state = {
      canBeResized: false,
    }
  }

  // Direct actions
  onHold = () => {
    this.setState({
      canBeResized: true,
    })
  }

  onResize = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.state['canBeResized']) {
      parent.postMessage(
        {
          pluginMessage: {
            type: 'RESIZE_UI',
            origin: {
              x: e.nativeEvent.screenX - e.nativeEvent.clientX,
              y: e.nativeEvent.screenY - e.nativeEvent.clientY,
            },
            shift: {
              x: (e as any).nativeEvent.layerX,
              y: (e as any).nativeEvent.layerY,
            },
            cursor: {
              x: e.nativeEvent.screenX,
              y: e.nativeEvent.screenY,
            },
            movement: {
              x: e.nativeEvent.movementX,
              y: e.nativeEvent.movementY,
            },
          },
        },
        '*'
      )
    }
  }

  onReleased = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      canBeResized: false,
    })
    e.target.removeEventListener('mouseleave', () => this.onResize)
    e.target.removeEventListener('mouseup', () => this.onResize)
  }

  // Render
  render() {
    return (
      <Bar
        rightPart={
          <>
            <div className="shortcuts snackbar">
              <Feature
                isActive={
                  features.find(
                    (feature) => feature.name === 'SHORTCUTS_DOCUMENTATION'
                  )?.isActive
                }
              >
                <Button
                  type="icon"
                  icon="library"
                  action={() =>
                    parent.postMessage(
                      {
                        pluginMessage: {
                          type: 'OPEN_IN_BROWSER',
                          url: 'https://uicp.link/docs',
                        },
                      },
                      '*'
                    )
                  }
                />
              </Feature>
              <Menu
                id="shortcuts-menu"
                icon="info"
                options={[
                  {
                    label: locals[this.props.lang].shortcuts.news,
                    value: null,
                    feature: null,
                    position: 0,
                    type: 'OPTION',
                    isActive:
                      features.find(
                        (feature) => feature.name === 'SHORTCUTS_HIGHTLIGHT'
                      )?.isActive ?? true,
                    isBlocked: isBlocked(
                      'SHORTCUTS_HIGHLIGHT',
                      this.props.planStatus
                    ),
                    children: [],
                    action: () => this.props.onReOpenHighlight(),
                  },
                  {
                    label: locals[this.props.lang].about.getHelp.email,
                    value: null,
                    feature: null,
                    position: 0,
                    type: 'OPTION',
                    isActive: features.find(
                      (feature) => feature.name === 'SHORTCUTS_EMAIL'
                    )?.isActive,
                    isBlocked: isBlocked(
                      'SHORTCUTS_EMAIL',
                      this.props.planStatus
                    ),
                    children: [],
                    action: () =>
                      parent.postMessage(
                        {
                          pluginMessage: {
                            type: 'OPEN_IN_BROWSER',
                            url: 'https://uicp.link/send-message',
                          },
                        },
                        '*'
                      ),
                  },
                  {
                    label: locals[this.props.lang].about.repository,
                    value: null,
                    feature: null,
                    position: 0,
                    type: 'OPTION',
                    isActive: features.find(
                      (feature) => feature.name === 'SHORTCUTS_REPOSITORY'
                    )?.isActive,
                    isBlocked: isBlocked(
                      'SHORTCUTS_REPOSITORY',
                      this.props.planStatus
                    ),
                    children: [],
                    action: () =>
                      parent.postMessage(
                        {
                          pluginMessage: {
                            type: 'OPEN_IN_BROWSER',
                            url: 'https://uicp.link/repository',
                          },
                        },
                        '*'
                      ),
                  },
                  {
                    label: '',
                    value: null,
                    feature: null,
                    position: 0,
                    type: 'SEPARATOR',
                    isActive: true,
                    isBlocked: false,
                    children: [],
                    action: () => null,
                  },
                  {
                    label: locals[this.props.lang].shortcuts.feedback,
                    value: null,
                    feature: null,
                    position: 0,
                    type: 'OPTION',
                    isActive: features.find(
                      (feature) => feature.name === 'SHORTCUTS_FEEDBACK'
                    )?.isActive,
                    isBlocked: isBlocked(
                      'SHORTCUTS_FEEDBACK',
                      this.props.planStatus
                    ),
                    children: [],
                    action: () => this.props.onReOpenFeedback(),
                  },
                  {
                    label: locals[this.props.lang].about.beInvolved.issue,
                    value: null,
                    feature: null,
                    position: 0,
                    type: 'OPTION',
                    isActive: features.find(
                      (feature) => feature.name === 'SHORTCUTS_REPORTING'
                    )?.isActive,
                    isBlocked: isBlocked(
                      'SHORTCUTS_REPORTING',
                      this.props.planStatus
                    ),
                    children: [],
                    action: () =>
                      parent.postMessage(
                        {
                          pluginMessage: {
                            type: 'OPEN_IN_BROWSER',
                            url: 'https://uicp.link/report',
                          },
                        },
                        '*'
                      ),
                  },
                  {
                    label: locals[this.props.lang].about.beInvolved.discuss,
                    value: null,
                    feature: null,
                    position: 0,
                    type: 'OPTION',
                    isActive: features.find(
                      (feature) => feature.name === 'SHORTCUTS_DISCUSSION'
                    )?.isActive,
                    isBlocked: isBlocked(
                      'SHORTCUTS_DISCUSSION',
                      this.props.planStatus
                    ),
                    children: [],
                    action: () =>
                      parent.postMessage(
                        {
                          pluginMessage: {
                            type: 'OPEN_IN_BROWSER',
                            url: 'https://uicp.link/discuss',
                          },
                        },
                        '*'
                      ),
                  },
                  {
                    label: '',
                    value: null,
                    feature: null,
                    position: 0,
                    type: 'SEPARATOR',
                    isActive: true,
                    isBlocked: false,
                    children: [],
                    action: () => null,
                  },
                  {
                    label: locals[this.props.lang].about.title,
                    value: null,
                    feature: null,
                    position: 0,
                    type: 'OPTION',
                    isActive: features.find(
                      (feature) => feature.name === 'SHORTCUTS_ABOUT'
                    )?.isActive,
                    isBlocked: isBlocked(
                      'SHORTCUTS_ABOUT',
                      this.props.planStatus
                    ),
                    children: [],
                    action: this.props.onReOpenAbout,
                  },
                  {
                    label: locals[this.props.lang].about.giveSupport.follow,
                    value: null,
                    feature: null,
                    position: 0,
                    type: 'OPTION',
                    isActive: features.find(
                      (feature) => feature.name === 'SHORTCUTS_NETWORKING'
                    )?.isActive,
                    isBlocked: isBlocked(
                      'SHORTCUTS_NETWORKING',
                      this.props.planStatus
                    ),
                    children: [],
                    action: () =>
                      parent.postMessage(
                        {
                          pluginMessage: {
                            type: 'OPEN_IN_BROWSER',
                            url: 'https://uicp.link/network',
                          },
                        },
                        '*'
                      ),
                  },
                ]}
                alignment="TOP_RIGHT"
              />
              {this.props.editorType === 'dev' ? (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                  }}
                ></div>
              ) : null}
            </div>
            {this.props.editorType != 'dev' ? (
              <div
                className={`box-resizer-grip ${icons['icon--resize-grip']}`}
                onMouseDown={this.onHold.bind(this)}
                onMouseMove={this.onResize.bind(this)}
                onMouseUp={this.onReleased.bind(this)}
                onMouseLeave={this.onReleased.bind(this)}
              ></div>
            ) : null}
          </>
        }
        leftPart={
          <Feature
            isActive={
              features.find((feature) => feature.name === 'GET_PRO_PLAN')
                ?.isActive
            }
          >
            <div className="pro-zone snackbar">
              {this.props.planStatus === 'UNPAID' &&
              this.props.trialStatus != 'PENDING' ? (
                <Button
                  type="compact"
                  icon="lock-off"
                  label={
                    this.props.trialStatus === 'UNUSED'
                      ? locals[this.props.lang].plan.tryPro
                      : locals[this.props.lang].plan.getPro
                  }
                  action={this.props.onGetProPlan}
                />
              ) : null}
              {this.props.trialStatus === 'PENDING' ? (
                <div className={`label ${texts.label}`}>
                  <div className="type--bold">
                    {Math.ceil(this.props.trialRemainingTime / 24)}
                  </div>
                  <div>
                    {Math.ceil(this.props.trialRemainingTime / 24) <= 1
                      ? 'day'
                      : 'days'}{' '}
                    left in this trial
                  </div>
                </div>
              ) : this.props.trialStatus === 'EXPIRED' &&
                this.props.planStatus != 'PAID' ? (
                <>
                  <div
                    className={`type ${texts.type} ${texts['type--secondary']} truncated`}
                  >
                    <span>{locals[this.props.lang].plan.trialEnded}</span>
                  </div>
                  <span
                    className={`type ${texts.type} ${texts['type--secondary']}`}
                  >
                    ﹒
                  </span>
                  <Button
                    type="tertiary"
                    label={locals[this.props.lang].shortcuts.trialFeedback}
                    action={this.props.onReOpenTrialFeedback}
                  />
                </>
              ) : null}
            </div>
          </Feature>
        }
        border={['TOP']}
      />
    )
  }
}
