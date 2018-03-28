import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import ControlPanel from './components/control-panel'
import Section from './components/section'
import CheckboxGroup from './components/checkbox-group'

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
    let layerName = e.target.getAttribute('value')
    let currentStatus = this.state.map.getLayoutProperty(layerName, 'visibility')
    this.state.map.setLayoutProperty(layerName, 'visibility', nextState[currentStatus])
  }

  render() {
    // TODO: remove dependency on assembly.css
    return (
      <div className="App">
        <div>
          <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        </div>
        <ControlPanel>
          <Section title="Region threats">
            <CheckboxGroup name="region-threats" group={[
              { value: 'natural-disasters',
                label: 'Natural Disasters' },
              { value: 'violent-conflicts',
                label: 'Violent Conflicts' }
            ]} onChange={(e) => console.log(e.target)} />
          </Section>
          <Section title="Region vulnerabilities">
            <CheckboxGroup name="region-vulnerabilities" group={[
              { value: 'regions',
                label: 'Human Development Index',
                onChange: this.controlPanelClickHandler.bind(this) },
              { value: 'time-to-school',
                label: 'Average Time to School' }
            ]} onChange={(e) => console.log(e.target)} />
          </Section>
          <Section title="School capabilities">
            <CheckboxGroup name="school-capabilities" group={[
              { value: 'schools',
                label: 'Connectivity',
                onChange: this.controlPanelClickHandler.bind(this) },
              { value: 'electricity',
                label: 'Electricity' },
              { value: 'mobile-coverage',
                label: 'Mobile Coverage' },
              { value: 'distance-to-roads',
                label: 'Distance to Roads' },
              { value: 'emergency-plan',
                label: 'Emergency Plan' }
            ]} onChange={(e) => console.log(e.target)} />
          </Section>
          <p className="controlPanel__footerMessage">The selected items will be considered when calculating the risk level of schools and areas.</p>
        </ControlPanel>
      </div>
    );
  }
}

export default App;
