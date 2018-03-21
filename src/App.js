import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

import './App.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicmRlYmVhc2ktcmgiLCJhIjoiY2pkcWQ2YXVxMHJkczJxcWxtZHhoNGtmdSJ9.3XajiSFSZPwtB4_ncmmaHQ';

class App extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      lng: -74.2973,
      lat: 4.5709,
      zoom: 4.5,
      data: {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[-73.46016667,-1.65044444]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-69.71527778,-1.44111111]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-70.041267,-4.102542]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-69.9211111,-4.10777777]},"properties":{}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-70.22113889,-3.84816666]},"properties":{}}]}
    };
  }

  componentDidMount() {
    const { lng, lat, zoom, data } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.on('load', function(e) {
      // Add the data to your map as a layer
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: data
        },
        layout: {
          'icon-image': 'circle-11',
          'icon-allow-overlap': true,
        }
      });
    });
  }

  render() {
    // TODO: remove dependency on assembly.css
    return (
      <div className="App">
        <div>
          <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        </div>
      </div>
    );
  }
}

export default App;
