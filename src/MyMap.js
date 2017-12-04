import React, {Component} from 'react'

import {
  Map,
  ZoomControl,
  TileLayer,
} from 'react-leaflet'
// import L from 'leaflet';


class MyMap extends Component {
  state = {
    lat: 0,
    lng: 0,
    zoom: 2,
  }
  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map ref="map" center={position} zoom={this.state.zoom} zoomControl={false}>
      <ZoomControl position="bottomleft" />
      <TileLayer
        url='https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXlhbmV6IiwiYSI6ImNqNHloOXAweTFveWwzM3A4M3FkOWUzM2UifQ.GfClkT4QxlFDC_xiI37x3Q'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors '
      />
        </Map>
    )
  }
}

export default MyMap;
