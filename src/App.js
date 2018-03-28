import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

// Components
import ControlPanel from './components/control-panel'
import Section from './components/section'
import InputGroup from './components/input-group'

// Helpers
import {calculate_index} from './helpers/helper-index-scores'

// Main style
import './App.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicmRlYmVhc2ktcmgiLCJhIjoiY2pkcWQ2YXVxMHJkczJxcWxtZHhoNGtmdSJ9.3XajiSFSZPwtB4_ncmmaHQ';

class App extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      map: {},
      lng: -74.2973,
      lat: 4.5709,
      zoom: 4.5
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
          'fill-opacity': 0.0
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

      // Add click event to schools layer
      map.on('click', 'schools', (e) => {
        let coordinates = e.features[0].geometry.coordinates.slice()
        let schoolProperties = e.features[0].properties

        // output all properties besides color
        let html = Object.keys(schoolProperties)
          .filter((key) => key !== 'color')
          .reduce((acc, key) => {
          return acc + `<p><strong>${key}:</strong> ${schoolProperties[key]}</p>`
        }, '')

        new mapboxgl.Popup().setLngLat(coordinates).setHTML(html).addTo(map)
      })

      // Change the cursor to a pointer
      map.on('mouseenter', 'schools', (e) => {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'schools', (e) => {
        map.getCanvas().style.cursor = ''
      })
    });
  }

  displayLayerHandler(e) {
    // layer name should be stored in element's value property
    let layerName = e.target.getAttribute('value')
    // will be 'visible' or 'none'
    let currentState = e.target.checked ? 'visible' : 'none'

    // Set layer visibility
    this.state.map.setLayoutProperty(layerName, 'visibility', currentState)
  }

  changeRegionPaintPropertyHandler(e) {
    var matches = document.querySelectorAll("input[name=region]:checked");
    let atts_to_aggregate = ['+']
    matches.forEach(t => {
      atts_to_aggregate.push(
        ['get', t.value]
      )
    })

    let layerName = e.target.getAttribute('value')
    this.state.map.setPaintProperty('regions', 'fill-opacity', ['/', atts_to_aggregate, atts_to_aggregate.length-1])
  }

  render() {
    return (
      <div className="App">
        <div>
          <div ref={el => this.mapContainer = el} className="mainMap" />
        </div>
        <ControlPanel>
          <Section title="Region threats">
            <InputGroup type="checkbox" name="region" group={[
              /*
              { value: 'natural-disasters',
                label: 'Natural Disasters' },
              { value: 'violent-conflicts',
                label: 'Violent Conflicts' }
              */
            ]} onChange={(e) => {}} />
          </Section>
          <Section title="Region vulnerabilities">
            <InputGroup type="checkbox" name="region" group={[
              { value: 'hdi',
                label: 'Human Development Index' },
              { value: 'pop',
                label: 'Population' }
              /* ,
              { value: 'time-to-school',
                label: 'Average Time to School' }
              */
            ]} onChange={this.changeRegionPaintPropertyHandler.bind(this)} />
          </Section>
          <Section title="School capabilities">
            <InputGroup type="checkbox" name="school" group={[
              { value: 'schools',
                label: 'Connectivity',
                onChange: this.displayLayerHandler.bind(this),
                defaultChecked: 'checked' },
              /* ,
              { value: 'electricity',
                label: 'Electricity' },
              { value: 'mobile-coverage',
                label: 'Mobile Coverage' },
              { value: 'distance-to-roads',
                label: 'Distance to Roads' },
              { value: 'emergency-plan',
                label: 'Emergency Plan' }
              */
            ]} onChange={(e) => {}} />
          </Section>
          <p className="controlPanel__footerMessage">The selected items will be considered when calculating the risk level of schools and areas.</p>
        </ControlPanel>
      </div>
    );
  }
}

export default App;
