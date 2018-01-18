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
import {
  selectCountry
} from '../actions/action-select-country';
import {
  adminStyle
} from '../helpers/helper-admins-style';
import {
  onEachAdminFeature
} from '../helpers/helper-admin-onEach';
import {
  selectAdmin
} from '../actions/action-select-admin';
import {
  countryStyle
} from '../helpers/helper-countries-style';
import {
  onEachCountryFeature
} from '../helpers/helper-country-onEach';
import {
  pointToLayer
} from '../helpers/helper-country-point';
import {
  GeoJSON,
  Map,
  ZoomControl,
  TileLayer
} from 'react-leaflet'
import {
  alpha3ToAlpha2,
} from 'i18n-iso-countries';
import {
  fetchDates
} from '../actions/action-fetch-dates.js'
import Docker from './Dock'
const _ = require('lodash');
let cc;

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
      zoom: 2,
      docker: false,
      value: 3,
      didUpdate: false,
    }

  }

  /**
   * componentWillMount - Calls initialLoad which loads initial data
   *
   */
  componentWillMount() {
    this.props.initialLoad();
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.activeCountry.selectedCountryName !== this.props.activeCountry.selectedCountryName) {
      this.setState({
        didUpdate: false,
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeCountry.selectedCountryName !== this.props.activeCountry.selectedCountryName) {
      if (this.state.docker) {
        this.setState({
          didUpdate: true
        })
      }
    }
  }



  /**
   * geoFilter - filters geojson file
   *
   * @param  {type} feature features
   * @return {type}         description
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
   * Render
   * @return {object} JSX
   */
  render() {
    const position = [this.state.lat, this.state.lng]

    // console.log(this.props.activeCountry.geojson);
    return (
      <div>
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
            onEachFeature={onEachCountryFeature(this, this.props.sliderValues.sliderVal)}
            filter={this.geoFilter.bind(this)}
          ></GeoJSON>
          <GeoJSON
            key={_.uniqueId()}
            data={this.props.activeCountry.geojson}
            style={adminStyle(this.props)}
            onEachFeature={onEachAdminFeature(this.props)}
            filter={this.geoFilter.bind(this)}
          ></GeoJSON>
          <GeoJSON
            key={_.uniqueId()}
            data={this.props.activeCountry.points}
            pointToLayer={pointToLayer(this.props.sliderValues.sliderVal)}
          ></GeoJSON>
        </Map>
        <Docker didUpdate={this.state.didUpdate}></Docker>
      </div>
    )
  }
}


/* eslint-disable require-jsdoc*/
function mapStateToProps(state) {
  return {
    initialCountries: state.initialCountries.initialCountries,
    allCountries: state.allCountries,
    activeCountry: state.activeCountry,
    sliderValues: state.sliderChanged

  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    initialLoad: InitialLoad,
    fetchDates: fetchDates,
    selectCountry: selectCountry,
    selectAdmin: selectAdmin,
  }, dispatch)
}

/* eslint-enablerequire-jsdoc*/

export default connect(mapStateToProps, matchDispatchToProps)(MyMap);