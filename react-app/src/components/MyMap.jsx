/* eslint-disable no-unused-vars */
import React, {
  Component
} from 'react';
import ReactWebglLeaflet from 'react-webgl-leaflet'
import {
  connect
} from 'react-redux';

import {
  bindActionCreators
} from 'redux'
import fetchAvailableCountries
from '../actions/action-fetch-available-countries';
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

import Popup from './Popup.jsx'
import HoverButton from './HoverButton.jsx'

import {
  GeoJSON,
  Map,
  ZoomControl,
  TileLayer
} from 'react-leaflet'
import L from 'leaflet'
import Docker from './Dock'
import UnicefNav from './UnicefNav';
import LoadingSpinner from './LoadingSpinner'
const fetch_url = window.location.origin + '/' +
    'schools' + '/school/';
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
      zoom: 2,
      docker: false,
      value: 3,
      didUpdate: false,
      loading: false,
      onHover: false,

    }

  }

  /**
   * componentWillMount - Calls initialLoad which loads initial data
   *
   */
  componentWillMount() {
    this.props.fetchAvailableCountries();
  }
  /**
   * componentWillUpdate
   * @param  {Object} nextProps
   * @param  {Object} nextState
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.activeCountry.selectedCountryName !==
      this.props.activeCountry.selectedCountryName) {
      this.setState({
        didUpdate: false
      })
    }
  }
  /**
   * componentWillMount
   * @param  {Object} prevProps
   * @param  {Object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeCountry.selectedCountry !==
      this.props.activeCountry.selectedCountry) {
      if (this.state.docker) {
        this.setState({didUpdate: true})
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
      if (
        this.props.availableCountries.indexOf(feature.id.toLowerCase()) > -1
      ) {
        return true
      }
      return false
    }

    return true
  }

  /**
   *   buttonHover  - Manages state for dock hovering
   *
   */
  buttonHover = () => {
    this.setState({
      onHover: !this.state.onHover
    })
  }


  /**
   * Render
   * @return {object} JSX
   */
  render() {
    const style = {
      position: 'relative',
      top: '200px'
    }
    const position = [this.state.lat, this.state.lng]
    return (
      <div>
        <UnicefNav></UnicefNav>
        <Docker  className="dockerClass" didUpdate={this.state.didUpdate} buttonHover={this.state.onHover}></Docker>
        <Map ref='map'
          ref={m => {
            this.leafletMap = m;
          }
          }
          center={position}
          zoom={this.state.zoom}
          zoomControl={false}>
          <ZoomControl position='bottomleft' />
          <TileLayer
            ref={t => {
              this.tileLayer = t;
            }}
            url={this.state.url}
            attribution={this.state.attribution}
          />

          <GeoJSON
            key={_.uniqueId()}
            data={this.props.allCountries}
            style={countryStyle(this.props)}
            onEachFeature={onEachCountryFeature(
              this, this.props.sliderValues.sliderVal
            )}
            filter={this.geoFilter.bind(this)}
          ></GeoJSON>
          <GeoJSON
            key={_.uniqueId()}
            data={this.props.activeCountry.polygons}
            style={adminStyle(this.props)}
            onEachFeature={onEachAdminFeature(this.props)}
          ></GeoJSON>
        <ReactWebglLeaflet leafletMap={this.leafletMap}
            points={this.props.activeCountry.points}
            fetchUrl={fetch_url}
            />
        </Map>
        <LoadingSpinner display={this.props.loading}></LoadingSpinner>
        <Popup style={style}/>
        <HoverButton />
      </div>
    )
  }
}

/* eslint-disable require-jsdoc*/
function mapStateToProps(state) {
  return {
    availableCountries: state.availableCountries.availableCountries,
    allCountries: state.allCountries,
    activeCountry: state.activeCountry,
    sliderValues: state.sliderChanged,
    loading: state.loading
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAvailableCountries: fetchAvailableCountries,
    selectCountry: selectCountry,
    selectAdmin: selectAdmin
  }, dispatch)
}

/* eslint-enablerequire-jsdoc*/

export default connect(mapStateToProps, matchDispatchToProps)(MyMap);
