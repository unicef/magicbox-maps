import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

// Components
import ControlPanel from './components/control-panel'
import Section from './components/section'
import InputGroup from './components/input-group'
import Legend from './components/legend'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import createFilterOptions from 'react-select-fast-filter-options'

// Helpers
import {calculate_index} from './helpers/helper-index-scores'
import apiConfig from './helpers/api-config'

// Main style
import './App.css';

// Map colors
const mapColors = {
  // higher color will be shown where indexes are 1
  higher: '#0068EA',
  // lower color will be shown where indexes are 0
  lower: '#DCDCDC'
}

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
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    this.setState({map});
    
    // Promises
    let shapesPromise  = fetch(apiConfig.shapes).then((response) => response.json())
    let schoolsPromise = fetch(apiConfig.schools).then((response) => response.json())
    let mapLoadPromise = new Promise((resolve, reject) => {
      map.on('load', (e) => {
        resolve(map)
      })

      map.on('error', (e) => {
        reject(map)
      })
    })

    // Set data for regions when regions and map are available
    Promise.all([shapesPromise, mapLoadPromise]).then(([geojson, map]) => {
      map.getSource('regions').setData(geojson)
    })

    // Set data for schools when regions and map are available
    Promise.all([schoolsPromise, mapLoadPromise]).then(([geojson, map]) => {
      map.getSource('schools').setData(geojson)
    })

    // Handle shapes data
    shapesPromise.then(function(myJson) {
      // Calculate indexes
      myJson.features = calculate_index(
        myJson.features, 'population', 'pop'
      )
      myJson.features = calculate_index(
        myJson.features, 'threats', 'threats_index'
      )
      myJson.features = calculate_index(
        myJson.features, 'violence', 'violence_index'
      )

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

      this.setState({regionNames})
    })

    // Handle school data
    schoolsPromise.then((geojson) => {
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

      this.setState({
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
          data: {
            type: "FeatureCollection",
            features: []
          }
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
          data: {
            type: "FeatureCollection",
            features: []
          }
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
        0, mapColors.lower,
        1, mapColors.higher
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
              /*
              { value: 'natural-disasters',
                label: 'Natural Disasters' },
              { value: 'violent-conflicts',
                label: 'Violent Conflicts' }
              */
            ]} onChange={this.changeRegionPaintPropertyHandler.bind(this)} />
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
          <Legend from={mapColors.higher} to={mapColors.lower} steps={10} leftText="Most Risk" rightText="Least Risk" />
        </ControlPanel>
      </div>
    );
  }
}

export default App;
