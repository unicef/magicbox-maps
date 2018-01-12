import {
  alpha3ToAlpha2
} from 'i18n-iso-countries';
const config = require('../config.js')
/**
 * onEach
 * @param {object} myMapObj
 * @return {function} function
 */
export function onEachCountryFeature(myMapObj) {
  return (feature, layer) => {
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
          centerCountry(myMapObj, e.latlng, 6);
          // Fetch dates for country
          // this.props.fetchDates()
        }
        // layer.setStyle({
        //   fillColor: 'red'
        // });
        // this.onEachFeature(feature, layer)
        // myMapObj.props.selectCountry(e.target.feature);
        if (config.mode != 'schools') {
          myMapObj.props.selectCountry(e.target.feature);
          myMapObj.props.fetchDates(e.target.feature);
        } else {
          let alpha2 = alpha3ToAlpha2(e.target.feature.id);
          myMapObj.props.selectCountry(alpha2);
          console.log(alpha2);
        }
      }
    });
  }
}

/**
 * enterCountry
 * @param {object} myMapObj
 * @param {object} latlng
 * @param {object} lev
 */
function centerCountry(myMapObj, latlng, lev) {
  myMapObj.refs.map.leafletElement.flyTo(latlng, lev);
}
