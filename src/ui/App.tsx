import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dispatcher from './modules/Dispatcher';
import CreatePalette from './services/CreatePalette';
import EditPalette from './services/EditPalette';
import Onboarding from './services/Onboarding';
import 'figma-plugin-ds/dist/figma-plugin-ds.css';
import './app.css';
import chroma from 'chroma-js';
import { palette, presets } from '../palette-package';
import { v4 as uuidv4 } from 'uuid';

declare function require(path: string): any;

class App extends React.Component {

  dispatch: any;

  constructor(props) {
    super(props);
    this.dispatch = {
      colors: new Dispatcher(
        () => parent.postMessage({ pluginMessage: { type: 'update-colors', data: this.state['newColors'] } }, '*'),
        500
      )
    };
    this.state = {
      service: 'None',
      newScale: {},
      hasCaptions: true,
      onGoingStep: '',
      newColors: {},
      context: 'Scale',
      preset: {}
    }
  }

  // Events
  navHandler = (e: any) => this.setState({ context: e.target.innerText, onGoingStep: 'tab changed' })

  captionsHandler = (bool: boolean) => this.setState({ hasCaptions: bool, onGoingStep: 'captions changed' })

  colorHandler = (e: any) => {
    let name, colors, id;
    try {
      name = e.nativeEvent.path.filter(el => el.className === 'colors__item')[0].id;
      id = e.nativeEvent.path.filter(el => el.className === 'colors__item')[0].getAttribute('data-id')
    } catch {};

    switch (e.target.id) {

      case 'hex':
        colors = this.state['newColors'].map(item => {
          const rgb = chroma(e.target.value)._rgb;
          if (item.id === id)
            item.rgb = {
              r: rgb[0] / 255,
              g: rgb[1] / 255,
              b: rgb[2] / 255
            }
          return item
        });
        this.setState({
          newColors: colors,
          onGoingStep: 'color changed'
        });
        e._reactName === 'onBlur' ? this.dispatch.colors.on.status = false : this.dispatch.colors.on.status = true;
        break;

      case 'lightness':
        colors = this.state['newColors'].map(item => {
          const rgb = chroma(item.rgb.r * 255, item.rgb.g * 255, item.rgb.b * 255).set('lch.l', e.target.value)._rgb
          if (item.id === id)
            item.rgb = {
              r: rgb[0] / 255,
              g: rgb[1] / 255,
              b: rgb[2] / 255
            }
          return item
        });
        this.setState({
          newColors: colors,
          onGoingStep: 'color changed'
        });
        parent.postMessage({ pluginMessage: { type: 'update-colors', data: colors } }, '*');
        break;

      case 'chroma':
        colors = this.state['newColors'].map(item => {
          const rgb = chroma(item.rgb.r * 255, item.rgb.g * 255, item.rgb.b * 255).set('lch.c', e.target.value)._rgb
          if (item.id === id)
            item.rgb = {
              r: rgb[0] / 255,
              g: rgb[1] / 255,
              b: rgb[2] / 255
            }
          return item
        });
        this.setState({
          newColors: colors,
          onGoingStep: 'color changed'
        });
        parent.postMessage({ pluginMessage: { type: 'update-colors', data: colors } }, '*');
        break;

      case 'hue':
        colors = this.state['newColors'].map(item => {
          const rgb = chroma(item.rgb.r * 255, item.rgb.g * 255, item.rgb.b * 255).set('lch.h', e.target.value)._rgb
          if (item.id === id)
            item.rgb = {
              r: rgb[0] / 255,
              g: rgb[1] / 255,
              b: rgb[2] / 255
            }
          return item
        });
        this.setState({
          newColors: colors,
          onGoingStep: 'color changed'
        });
        parent.postMessage({ pluginMessage: { type: 'update-colors', data: colors } }, '*');
        break;

      case 'remove':
        colors = this.state['newColors'].filter(item => item.id != id);
        this.setState({
          newColors: colors,
          onGoingStep: 'color changed'
        });
        parent.postMessage({ pluginMessage: { type: 'update-colors', data: colors } }, '*');
        break;

      case 'add':
        colors = this.state['newColors'];
        colors.push({
          name: 'New UI Color',
          rgb: {
            r: .53,
            g: .92,
            b: .97
          },
          id: uuidv4()
        });
        this.setState({
          newColors: colors,
          onGoingStep: 'color changed'
        });
        parent.postMessage({ pluginMessage: { type: 'update-colors', data: colors } }, '*')
        break;

      case 'rename':
        colors = this.state['newColors'].map(item => {
          if (item.id === id)
            item.name = e.target.value
          return item
        });
        this.setState({
          newColors: colors,
          onGoingStep: 'color changed'
        });
        e._reactName === 'onBlur' ? setTimeout(() => this.state['onGoingStep'] === 'color changed' ? parent.postMessage({ pluginMessage: { type: 'update-colors', data: colors } }, '*') : null, 500) : null;
        e.key === 'Enter' ? parent.postMessage({ pluginMessage: { type: 'update-colors', data: colors } }, '*') : null

    }
  }

  presetHandler = (e: any) => {
    switch((e.target as HTMLInputElement).value) {

      case presets.material.name:
        this.setState({
          preset: presets.material,
          onGoingStep: 'preset changed'
        })
        break;

      case presets.ant.name:
        this.setState({
          preset: presets.ant,
          onGoingStep: 'preset changed'
        })
        break;

      case presets.atlassian.name:
        this.setState({
          preset: presets.atlassian,
          onGoingStep: 'preset changed'
        })
        break;

      case presets.custom.name:
        presets.custom.scale = [1, 2];
        this.setState({
          preset: presets.custom,
          onGoingStep: 'preset changed'
        })

    }
  }

  customHandler = (e: any) => {
    let scale = this.state['preset']['scale'];
    switch(e.target.id) {

      case 'add':
        if (scale.length < 24) {
          scale.push(scale.length + 1)
          this.setState({
            preset: {
              name: presets.custom.name,
              scale: scale,
              min: palette.min,
              max: palette.max
            }
          })
        }
        break;

      case 'remove':
        if (scale.length > 2) {
          scale.pop()
          this.setState({
            preset: {
              name: presets.custom.name,
              scale: scale,
              min: palette.min,
              max: palette.max
            }
          })
        }

    }
    if (scale.length == 2)
      this.setState({
        onGoingStep: 'scale item min limit'
      })
    else if (scale.length == 24)
      this.setState({
        onGoingStep: 'scale item max limit'
      })
    else
      this.setState({
        onGoingStep: 'scale item edited'
      })
  }

  render() {
    onmessage = (e: any) => {
      switch (e.data.pluginMessage.type) {

        case 'empty-selection':
          this.setState({
            service: 'None',
            hasCaptions: true,
            onGoingStep: 'selection empty'
          });
          break;

        case 'color-selected':
          this.setState({
            service: 'Create',
            hasCaptions: true,
            onGoingStep: 'colors selected',
            preset: presets.material
          });
          break;

        case 'palette-selected':
          const putIdsOnColors = e.data.pluginMessage.data.colors.map(color => {
            color.id === undefined ? color.id = uuidv4() : color.id = color.id;
            return color
          });
          if (e.data.pluginMessage.data.captions === 'hasNotCaptions')
            this.setState({
              service: 'Edit',
              context: 'Scale',
              newScale: e.data.pluginMessage.data.scale,
              hasCaptions: false,
              newColors: putIdsOnColors,
              preset: e.data.pluginMessage.data.preset,
              onGoingStep: 'palette selected'
            })
          else if (e.data.pluginMessage.data.captions === 'hasCaptions')
            this.setState({
              service: 'Edit',
              context: 'Scale',
              newScale: e.data.pluginMessage.data.scale,
              hasCaptions: true,
              newColors: putIdsOnColors,
              preset: e.data.pluginMessage.data.preset,
              onGoingStep: 'palette selected'
            })

      }
    };

    return (
      <main>
        {this.state['service'] === 'Create' ?
          <CreatePalette
            preset={this.state['preset']}
            hasCaptions={this.state['hasCaptions']}
            onCaptionsChange={this.captionsHandler}
            onGoingStep={this.state['onGoingStep']}
            onPresetChange={this.presetHandler}
            onCustomPreset={this.customHandler}
          />
        : null}
        {this.state['service'] === 'Edit' ?
          <EditPalette
            scale={this.state['newScale']}
            colors={this.state['newColors']}
            preset={this.state['preset']}
            context={this.state['context']}
            hasCaptions={this.state['hasCaptions']}
            onCaptionsChange={this.captionsHandler}
            onColorChange={this.colorHandler}
            onContextChange={this.navHandler}
          />
        : null}
        {this.state['service'] === 'None' ? <Onboarding /> : null}
      </main>
    )
  }

};

ReactDOM.render(<App />, document.getElementById('react-page'))
