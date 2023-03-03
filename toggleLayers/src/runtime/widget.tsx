/** @jsx jsx */
import { React, AllWidgetProps, jsx } from 'jimu-core'
import { IMConfig } from '../config'
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { Select, Switch } from 'jimu-ui'

import { getStyle } from './lib/style'

// Interface
interface IState {
  jimuMapView: JimuMapView
  sublayers: any
  visibleSublayerId: string
  service: any
  serviceVisibility: boolean
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, IState> {
  // State
  state = {
    jimuMapView: null,
    sublayers: null,
    visibleSublayerId: null,
    service: null,
    serviceVisibility: false
  }

  // Inicializační funkce
  // Spustí se po načtení view, viz metoda render
  initWidget = async (jmv: JimuMapView) => {
    if (jmv) {
      await this.setState({
        jimuMapView: jmv
      })

      jmv.view.when(() => {
        this.createSelectList(jmv.view.allLayerViews)
      })
    }
  }

  // Vytvoření seznamu vrstev v Select menu
  createSelectList = async (mapServices) => {
    const layerList = []
    let firstVisibleLayerCatched = false
    mapServices.forEach((mapService: any) => {
      if (mapService.layer.id === this.props.config.serviceId) {
        // Kontrola, zda je služba v mapě viditelná nebo vypnutá
        this.setState({ service: mapService.layer, serviceVisibility: mapService.layer.visible })

        // Všechny sublayers definované služby
        mapService.layer.allSublayers.forEach((sublayer: any) => {
          // Pokud tyto sublayers nejsou uvedeny v nastavení pro vyloučení vrstev
          if (!this.props.config.excludedSublayers.includes(sublayer.id.toString())) {
            layerList.push(sublayer)

            // První viditelná vrstva se nastaví jako výchozí hodnota v seznamu vrstev
            if (!firstVisibleLayerCatched && sublayer.visible === true) {
              this.setState({ visibleSublayerId: sublayer.id })
              firstVisibleLayerCatched = true
            }
          }
        })
      }
    })

    // Otočení pořadí vrstev tak, aby odpovídalo řazení ve webové mapě
    const layerListReveresed = layerList.reverse()

    this.setState({ sublayers: layerListReveresed })
  }

  // Po výběru subvrstvy
  onSelectLayer = (e: any) => {
    this.setState({ visibleSublayerId: e.target.value })
    // Vypnutí všech vrstev
    this.state.sublayers.forEach((sublayer) => {
      sublayer.visible = false

      // .. a zapnutí aktuální vybrané vrstvy
      if (sublayer.id === e.target.value) {
        sublayer.visible = true
      }
    })
  }

  // Vypínání / zapínání služby
  toggleServiceVisibility = (e: any) => {
    // Přepnutí viditelnosti služby
    this.state.service.visible = !this.state.service.visible
    // Uložení nového nastavení služby do proměnné
    const serviceNewState = this.state.service
    // Nastavení nového stavu - tj. do stavu je uložena služba s novým nastavením a nové nastavení přepínače
    this.setState({ service: serviceNewState, serviceVisibility: !this.state.serviceVisibility })
  }

  // Render
  render () {
    return (
      <div css={getStyle(this.props.theme)} style={{ height: '100%' }}>
        <div className="widget-body">
          {/* Navázání na widget mapy  */}
          { Object.prototype.hasOwnProperty.call(this.props, 'useMapWidgetIds') &&
            this.props.useMapWidgetIds &&
            this.props.useMapWidgetIds[0] && (
              <JimuMapViewComponent
                useMapWidgetId={this.props.useMapWidgetIds?.[0]}
                onActiveViewChange={this.initWidget}
              />
          )
        }
          <div className='header-container'>
            <div className='title'>{ this.props.config.title }</div>
            <Switch className='toggle-visibility'
              checked={this.state.serviceVisibility}
              onChange={this.toggleServiceVisibility}>
            </Switch>
          </div>
          <div>
            <Select value={this.state.visibleSublayerId} onChange={this.onSelectLayer}>
              {this.state.sublayers
                ? this.state.sublayers.map(sublayer => (
                  <option value={sublayer.id}>
                    <div className='text-truncate'>
                    {sublayer.title}
                    </div>
                  </option>
                ))
                : ''}
            </Select>
          </div>
        </div>
      </div>
    )
  }
}
