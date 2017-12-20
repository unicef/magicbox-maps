/* eslint-disable no-unused-vars*/
import React, {
  Component
} from 'react'
/* eslint-enable no-unused-vars*/
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'
import InitialLoad from '../actions/initialLoad';
import {selectCountry} from '../actions/action-select-country';
import {countryStyle} from '../helpers/helper-countries-style';
import {adminStyle} from '../helpers/helper-admins-style';
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
import {fetchDates} from '../actions/action-fetch-dates.js'
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
   * componentWillMount - Calls initialLoad which loads initial data
   *
   */
  componentWillMount() {
    this.props.initialLoad();
  }

  /**
   * Returns style for leaflet polygon
   * @param  {object} feature request object
   * @return {boolean} boolean
   */
  geoFilter(feature) {
    // If at country level
    if (feature.id) {
      let alpha2 = alpha3ToAlpha2(feature.id);
      if (this.props.initialCountries.indexOf(alpha2) > -1) {
        return true
      }
      return false
    }
    return true
  }

  /**
   * enterCountry
   * @param  {object} latlng
   * @param  {object} lev
   */
  centerCountry(latlng, lev) {
    this.refs.map.leafletElement.flyTo(latlng, lev);
  }

  /**
   * onEach
   * @param  {object} feature
   * @param  {object} layer
   */
  onEachFeature(feature, layer) {
    layer.on({
      'mouseover': (e) => {
        layer.setStyle({
          fillOpacity: 0.7
        });
      },
      'mouseout': e => {
        layer.setStyle({
          fillOpacity: 0.5
        })
      },
      'click': e => {
        // An admin 0 has been clicked
        if (feature.base_country) {
          this.centerCountry(e.latlng, 6);
          // Fetch dates for country
          // this.props.fetchDates()
        }
        layer.setStyle({
          fillColor: 'red'
        });
        // this.onEachFeature(feature, layer)
        this.props.selectCountry(e.target.feature);
        this.props.fetchDates(e.target.feature);
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
          data={this.props.allCountries}
          style={countryStyle(this.props)}
          onEachFeature={this.onEachFeature.bind(this)}
          filter={this.geoFilter.bind(this)}
        ></GeoJSON>
        <GeoJSON
          key={_.uniqueId()}
          data={this.props.activeCountry}
          style={adminStyle(this.props)}
          onEachFeature={this.onEachFeature.bind(this)}
          filter={this.geoFilter.bind(this)}
        ></GeoJSON>
      </Map>
    )
  }
}


/* eslint-disable require-jsdoc*/
function mapStateToProps(state) {
  return {
    initialCountries: state.initialCountries.initialCountries,
    allCountries: state.allCountries,
    activeCountry: state.activeCountry.geojson
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDates: fetchDates,
    initialLoad: InitialLoad,
    selectCountry: selectCountry
  }, dispatch)
}

/* eslint-enablerequire-jsdoc*/

export default connect(mapStateToProps, matchDispatchToProps)(MyMap);
