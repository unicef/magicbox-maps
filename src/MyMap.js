/* eslint-disable no-unused-vars*/
import React, {Component} from 'react'
/* eslint-enable no-unused-vars*/
import allGeojson from './data/allCountriesGEOJSON.js'
import displayCountries from './data/displayCountries.js';

import {
  GeoJSON,
  Map,
  ZoomControl,
  TileLayer
} from 'react-leaflet'
// import L from 'leaflet';
import {
  alpha3ToAlpha2
} from 'i18n-iso-countries';
const _ = require('lodash');

/**
 * My map class
 */
class MyMap extends Component {
  /**
   * State object
   * @param  {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?' +
      'access_token=' +
      'pk.eyJ1IjoiYXlhbmV6IiwiYSI6ImNqNHloOXAweTFveWwzM3A4M3FkOWUzM2UifQ.' +
      'GfClkT4QxlFDC_xiI37x3Q',
      attribution: '&copy; <a href=\'http://osm.org/copyright\'>OpenStreetMap</a>' +
      ' contributors ',
      lat: 0,
      lng: 0,
      zoom: 2
    }
  }

  /**
   * Returns style for leaflet polygon
   * @param  {object} geoJsonFeature request object
   * @return {object} style object
   */
  countryStyle(geoJsonFeature) {
    // var layer = e.target;
    const displayCountry = {
      fill: true,
      fillColor: '#0099FF',
      fillOpacity: .5,
      stroke: false
    }
    const nullDisplay = {
      fill: false,
      fillColor: '#0099FF',
      fillOpacity: 0,
      stroke: false
    }
    let alpha2 = alpha3ToAlpha2(geoJsonFeature.id);
    if (displayCountries.indexOf(alpha2) > -1) {
      return displayCountry;
    } else {
      return nullDisplay;
    }
  }

  /**
   * Returns style for leaflet polygon
   * @param  {object} feature request object
   * @return {boolean} boolean
   */
  geoFilter(feature) {
    let alpha2 = alpha3ToAlpha2(feature.id);
    if (displayCountries.indexOf(alpha2) > -1) {
      return true
    }
    return false
  }
  /**
   * onEach
   * @param  {object} feature
   * @param  {object} layer
   */
  onEachFeature(feature, layer) {
    // if (this.props.countrySelected.admin1 === feature.id) {
    //   layer.setStyle({
    //     fillOpacity: 0
    //   });
    // }
    layer.on({
      'mouseover': (e) => {
        layer.setStyle({
          fillOpacity: 0.7
        });
      },
      'mouseout': (e) => {
        layer.setStyle({
          fillOpacity: 0.5
        })
      },
      'click': (e) => {
        console.log(e);
        if (this.props.countrySelected.admin1 !== feature.id &&
          this.props.countrySelected.country === 'BR') {
          // var admin1 = e.target.feature.id;
          // //console.log(e.target.feature.properties.UF);
          // var admin1L = e.target.feature.properties.UF
          // console.log(admin1);
          // var alpha2 = 'BR'
          // console.log("Calling: " + alpha2);
          // this.props.loadSpinner(true);
          // this.centerCountry(e.latlng, 6);
          // this.props.clickedCountry(alpha2, this.props.sliderData.value, admin1, admin1L);
          // toLoad = true;
        }
        // console.log(e);
      }
    });
  }
  /**
   * Render
   * @return {object} JSX
   */
  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map ref='map'
        center={position}
        zoom={this.state.zoom}
        zoomControl={false}>
        <ZoomControl position='bottomleft' />
        <TileLayer
          url={this.state.url}
          attribution={this.state.attribution}
        />
        <GeoJSON
          key={_.uniqueId()}
          data={allGeojson}
          style={this.countryStyle.bind(this)}
          onEachFeature={this.onEachFeature.bind(this)}
          filter={this.geoFilter.bind(this)}
        ></GeoJSON>
      </Map>
    )
  }
}

export default MyMap;
