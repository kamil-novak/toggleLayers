/** @jsx jsx */
import { React, jsx } from 'jimu-core'
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { TextInput, Tooltip, Button, TextArea } from 'jimu-ui'
import { HelpOutlined } from 'jimu-icons/outlined/suggested/help'
import { MapWidgetSelector, SettingRow, SettingSection } from 'jimu-ui/advanced/setting-components'
import { IMConfig } from '../config'

import { getStyle } from './lib/style'

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig>, any> {
  constructor (props) {
    super(props)

    this.state = {
      // Config
      dataSources: null,
      title: this.props.config.title,
      serviceId: this.props.config.serviceId,
      excludedSublayers: this.props.config.excludedSublayers
    }
  }

  // Výběr mapy
  onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    this.props.onSettingChange({
      id: this.props.id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  // Title
  onTitleChange = (event: any) => {
    this.setState(prevState => ({
      title: event.target.value
    }))
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('title', event.target.value)
    })
  }

  // ID služby
  onServiceIdChange = (event: any) => {
    this.setState(prevState => ({
      serviceId: event.target.value
    }))
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('serviceId', event.target.value)
    })
  }

  // Vyloučené podvrstvy
  onExcludedSublayersChange = (event: any) => {
    const sublayerIds = event.target.value.replace(/\s/g, '')
    this.setState(prevState => ({
      excludedSublayers: event.target.value
    }))
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config.set('excludedSublayers', sublayerIds.split(','))
    })
  }

  render () {
    return (
      <div css={getStyle(this.props.theme)}>
        <div className="widget-setting">
          <SettingSection>
              <h6 className="setting-text-level-1">Mapa</h6>

              <label className="map-selector-section">
                <span className="text-break setting-text-level-3">Vybrat widget mapy:</span>
                <SettingRow>
                  <MapWidgetSelector useMapWidgetIds={this.props.useMapWidgetIds} onSelect={this.onMapWidgetSelected} />
                </SettingRow>
              </label>

          </SettingSection>

          <SettingSection>
              <h6 className="setting-text-level-1">Nastavení</h6>

              <label className="data-selector-section">
                <span className="text-break setting-text-level-3">Popisek</span>
                <Tooltip title="Popisek, který se objeví nad výběrem vrstev"><Button aria-label="Button" icon size="sm" type="tertiary" className="tooltip"><HelpOutlined/></Button></Tooltip>
                <TextInput className="standard-input" defaultValue={this.props.config.title} placeholder='např. Vyberte typ..' onChange={this.onTitleChange}/>
              </label>

              <label className="data-selector-section">
                <span className="text-break setting-text-level-3">ID služby (v rámci webové mapy)</span>
                <Tooltip title="ID vrstvy (resp. služby) webové mapy, v rámci která chceme přepínat jednotlivé podvrstvy. Widget spolupracuje pouze se službami typu MapServer, resp. vrstvami typu MapImageLayer."><Button aria-label="Button" icon size="sm" type="tertiary" className="tooltip"><HelpOutlined/></Button></Tooltip>
                <TextInput className="standard-input" defaultValue={this.props.config.serviceId} placeholder='např. Hrbitovy_view_interni_28' onChange={this.onServiceIdChange}/>
              </label>

              <label className="data-selector-section">
                <span className="text-break setting-text-level-3">Vyloučit podvrstvy</span>
                <Tooltip title="ID vrstev v rámci výše definované mapové služby, které nechceme v rámci widgetu přepínat. ID se oddělují čárkou."><Button aria-label="Button" icon size="sm" type="tertiary" className="tooltip"><HelpOutlined/></Button></Tooltip>
                <TextArea className="standard-input" defaultValue={this.props.config.excludedSublayers.join(',')} placeholder='např. 2, 6, 8' onChange={this.onExcludedSublayersChange}/>
              </label>
          </SettingSection>

        </div>
      </div>
    )
  }
}
