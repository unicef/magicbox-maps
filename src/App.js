import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Third-party React components
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import createFilterOptions from 'react-select-fast-filter-options';

// Custom React components
import ControlPanel from './components/control-panel';
import Section from './components/section';
import InputGroup from './components/input-group';
import Legend from './components/legend';
import ConnectivityChart from './components/connectivity-chart';

// Helpers
import {calculate_index} from './helpers/helper-index-scores';
import apiConfig from './helpers/api-config';

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
      zoom: 4.5,
      regionNames: [],
      schoolNames: [],
      searchValue: ''
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

    fetch(apiConfig.shapes).then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      myJson.features = calculate_index(
        myJson.features, 'population', 'pop'
      )
      myJson.features = calculate_index(
        myJson.features, 'threats', 'threats_index'
      )
      myJson.features = calculate_index(
        myJson.features, 'violence', 'violence_index'
      )
      component.setState({regions: myJson});

      return myJson
    }).then((geojson) => {
      let regionNames = geojson.features.map((feature) => {
        // get all region names from geojson
        return [
          feature.properties.NOMBRE_D,
          feature.properties.NOMBRE_M,
          feature.properties.NOMBRE_C
        ]
      }).reduce((acc, el) => {
        // join all names in the same array
        return acc.concat(el)
      }, []).filter((el, i, self) => {
        // filter for unicity
        return self.indexOf(el) === i
      })

      component.setState({regionNames})
    })

    fetch(apiConfig.schools).then((response) => {
      return response.json();
    }).then((geojson) => {
      // Store school data
      this.setState({schools: geojson})

      return geojson
    }).then((geojson) => {
      // Store school names
      let schoolNames = geojson.features.map((feature) => {
        // Get school name
        return feature.properties.name
      }).filter((name, i, self) => {
        // Remove duplicates
        return self.indexOf(name) === i
      })

      this.setState({schoolNames})
    })

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
        layout: {
          visibility: 'none'
        },
        paint: {
          'fill-opacity': 0.5
        }
      });

      map.addLayer({
        id: 'schools',
        type: 'circle',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: component.state.schools
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
    // lowest and highest color value
    const [ lowerColor, higherColor ] = [ '#fff', '#088' ]

    // Get all checked inputs for regions
    let matches = document.querySelectorAll("input[name=region]:checked");

    // Change layer visibility if there are matches
    this.state.map.setLayoutProperty('regions', 'visibility', matches.length ? 'visible' : 'none')

    if (!matches.length) {
      // no region selected
      return
    }

    // build the aggregation query
    let atts_to_aggregate = Array.prototype.slice.call(matches).reduce((a,t) => {
      a.push(['get', t.value])
      return a
    }, ['+'])

    // Set new paint property to color the map
    this.state.map.setPaintProperty(
      'regions',
      'fill-color',
      // linear interpolation for colors going from lowerColor to higherColor accordingly to aggregation value
      ['interpolate',
        ['linear'],
        ['/', atts_to_aggregate, atts_to_aggregate.length-1],
        0, lowerColor,
        1, higherColor
      ]
    )
  }

  render() {
    // Join region and school names
    const options = [].concat(this.state.regionNames, this.state.schoolNames).map(name => ({value: name, label: name}))

    return (
      <div className="App">
        <div>
          <div ref={el => this.mapContainer = el} className="mainMap" />
        </div>
        <ControlPanel>
          <Select name="search" placeholder="School or municipality" multi={true} className="search" value={this.state.searchValue} onChange={(selectedOption) => {
            let regionFilter = null
            let schoolFilter = null

            // Set current state
            this.setState({searchValue: selectedOption})

            if (selectedOption.length) {
              // Create filter for regions to look into all 'NOMBRE's
              regionFilter = ['any'].concat(...selectedOption.map((input) => {
                  return [
                    ['==', ['get', 'NOMBRE_C'], input.value],
                    ['==', ['get', 'NOMBRE_D'], input.value],
                    ['==', ['get', 'NOMBRE_M'], input.value]
                  ]
                }))

              // Create filter for schools to look into every 'name'
              schoolFilter = ['any'].concat(selectedOption.map((input) => {
                return ['==', ['get', 'name'], input.value]
              }))
            }

            // Set filters
            this.state.map.setFilter('regions', regionFilter)
            this.state.map.setFilter('schools', schoolFilter)
          }} filterOptions={createFilterOptions({options})} options={options} arrowRenderer={() => <i className="fas fa-search" />} />
          <Section title="Region threats">
            <InputGroup type="checkbox" name="region" group={[
              { value: 'threats_index',
                label: 'Natural Disasters Index' },
              { value: 'violence_index',
                label: 'Violence Index' }
            ]} onChange={this.changeRegionPaintPropertyHandler.bind(this)} />
          </Section>
          <Section title="Region vulnerabilities">
            <InputGroup type="checkbox" name="region" group={[
              { value: 'hdi',
                label: 'Human Development Index' },
              { value: 'pop',
                label: 'Population' }
            ]} onChange={this.changeRegionPaintPropertyHandler.bind(this)} />
          </Section>
          <Section title="School capabilities">
            <InputGroup type="checkbox" name="school" group={[
              { value: 'schools',
                label: 'Connectivity',
                onChange: this.displayLayerHandler.bind(this),
                defaultChecked: 'checked'
              }
            ]} onChange={(e) => {}} />
          </Section>
          <p className="controlPanel__footerMessage">The selected items will be considered when calculating the risk level of schools and areas.</p>
          <Legend hue={0} saturation={0} steps={10} leftText="Most Risk" rightText="Least Risk" />
          <ConnectivityChart></ConnectivityChart>
        </ControlPanel>
      </div>
    );
  }
}

export default App;
