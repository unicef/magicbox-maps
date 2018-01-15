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
import Dock from 'react-dock';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {
  Col,
  Row,
  Grid
} from 'react-bootstrap'
import {
  Pie
} from 'react-chartjs-2';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
const _ = require('lodash');
const styles = {
  remove: {
    position: 'absolute',
    zIndex: 1,
    right: '10px',
    top: '10px',
    cursor: 'pointer'
  },
  general: {
    color: 'white'

  }
}
const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};
const fillStyle = {
  'backgroundColor': 'blue'
}

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
      docker: true,
      value: 3,
    }
  }

  handleChange(value) {
    this.setState({
      value: value
    })
  }

  /**
   * componentWillMount - Calls initialLoad which loads initial data
   *
   */
  componentWillMount() {
    this.props.initialLoad();
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
            onEachFeature={onEachCountryFeature(this)}
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
            pointToLayer={pointToLayer(this.state.value)}
          ></GeoJSON>
        </Map>
        <Dock
          isVisible={this.state.docker}
          dockStyle={{ background: 'rgba(0, 0, 0, 0.4)' }}
          position='bottom'
          dimMode='none'
          defaultSize = {0.35}
        >
          <div style={styles.general}>
            <div style={{'textAlign': 'center'}}>
              <h2>{this.props.activeCountry.selectedCountryName}</h2>
            </div>
            <Glyphicon glyph='remove'
              onClick={() => this.setState({ docker: false })}
              style={styles.remove} />
            <Grid>
              <Row className="show-grid">
                <Col md={4}>
                  <h3> Information </h3>
                  <h4> Number of Schools: {this.props.activeCountry.selectedCountryNumSchools}</h4>
                  <h4> Average speed: {this.props.activeCountry.selectedCountryAvgMbps}</h4>
                </Col>
                <Col md={4}>
                  <Pie legend= {false} data={data} />
                </Col>
                <Col md={4}>
                  <div className='slider'>
                    <Slider
                      min={0}
                      max={12}
                      step={0.5}
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                      fillStyle={fillStyle}
                    />
                    <div className='value'>{this.state.value}</div>
                  </div>

                </Col>
              </Row>
            </Grid>
          </div>
        </Dock>
      </div>


    )
  }
}


/* eslint-disable require-jsdoc*/
function mapStateToProps(state) {
  return {
    initialCountries: state.initialCountries.initialCountries,
    allCountries: state.allCountries,
    activeCountry: state.activeCountry
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDates: fetchDates,
    initialLoad: InitialLoad,
    selectCountry: selectCountry,
    selectAdmin: selectAdmin
  }, dispatch)
}

/* eslint-enablerequire-jsdoc*/

export default connect(mapStateToProps, matchDispatchToProps)(MyMap);