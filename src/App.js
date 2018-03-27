import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import ControlPanel from './components/control-panel'
import CheckPanel from './components/check-panel'
import {calculate_index} from './helpers/helper-index-scores'
import './App.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicmRlYmVhc2ktcmgiLCJhIjoiY2pkcWQ2YXVxMHJkczJxcWxtZHhoNGtmdSJ9.3XajiSFSZPwtB4_ncmmaHQ';

class App extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      map: {},
      lng: -74.2973,
      lat: 4.5709,
      zoom: 4.5,
      // We'll replace the blank collection with actual data once the file has loaded.
      regions: {"type":"FeatureCollection","features":[]},
      schools: {"type":"FeatureCollection","features":[]},
    };
  }

  componentDidMount() {
    let component = this;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [component.state.lng, component.state.lat],
      zoom: component.state.zoom
    });
    component.setState({map: map});
    component.setState({indicator: 'population'})
    fetch('/data/mpio-hdi-pop.json').then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      myJson.features = calculate_index(
        myJson.features, 'population', 'pop'
      )
      component.setState({regions: myJson});
    });
    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      component.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.on('load', function(e) {
      map.addLayer({
        id: 'regions',
        type: 'fill',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: component.state.regions
        },
        paint: {
          'fill-color': '#088',
          'fill-opacity': component.state.indicator === 'population' ?
          0.0 : ['get', component.state.indicator]
        }
      });
      map.addLayer({
        id: 'schools',
        type: 'circle',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: '/data/schools.json'
        },
        paint: {
          'circle-radius': {
            'base': 1.75,
            'stops':[[12, 2], [22, 180]]
          },
          'circle-color': ['get', 'color']
        }
      });
    });
  }

  componentDidUpdate(){

  }

  checkPanelClickHandler(e) {
    const nextState = {
      show: false,
    }
    let layerName = e.target.getAttribute('nombre')

    let currentStatus = this.state.map.getLayer(layerName)
    let currentOpacityValue = this.state.map.getPaintProperty('regions', 'fill-opacity')
    console.log(e.target.checked, '!!!!')
    if (!e.target.checked) {
      this.state.map.setPaintProperty('regions', 'fill-opacity', ['get', 'trash'])
    } else {
      if (currentOpacityValue === 0) {
        this.state.map.setPaintProperty('regions', 'fill-opacity', ['get', layerName])
      } else {
        if (currentOpacityValue[1] === layerName) {
          this.state.map.setPaintProperty('regions', 'fill-opacity', ['get', 'trash'])
        } else {
          this.state.map.setPaintProperty('regions', 'fill-opacity', ['get', layerName])
        }
      }

    }
  }

  render() {

    let checks = {
      hdi: {
        checkPanelClickHandler: this.checkPanelClickHandler.bind(this),
        show: true
      },
      pop: {
        checkPanelClickHandler: this.checkPanelClickHandler.bind(this),
        show: false
      }
    }

    return (
      <div className="App">
        <div>
          <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        </div>
        <CheckPanel checks={checks}/>
      </div>
    );
  }
}

export default App;
