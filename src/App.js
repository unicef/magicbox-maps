import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import ControlPanel from './components/control-panel'
import Section from './components/section'

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
          data: '/data/mpio.json'
        },
        layout: {
          visibility: 'none'
        },
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8
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
        layout: {
          visibility: 'none'
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

  controlPanelClickHandler(e) {
    const nextState = {
      visible: 'none',
      none: 'visible'
    }
    let layerName = e.target.getAttribute('name')
    let currentStatus = this.state.map.getLayoutProperty(layerName, 'visibility')
    this.state.map.setLayoutProperty(layerName, 'visibility', nextState[currentStatus])

    if (nextState[currentStatus] === 'none') {
      e.target.classList.remove('active')
    } else {
      e.target.classList.add('active')
    }
  }

  render() {
    // TODO: remove dependency on assembly.css
    let controls = {
      schools: this.controlPanelClickHandler.bind(this),
      regions: this.controlPanelClickHandler.bind(this)
    }

    return (
      <div className="App">
        <div>
          <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        </div>
        <ControlPanel>
          <Section title="Region threats">
            <a>link</a>
          </Section>
          <Section title="Region vulnerabilities">
          </Section>
          <Section title="School capabilities">
          </Section>
        </ControlPanel>
      </div>
    );
  }
}

export default App;
