import arrToGeo from '../helpers/helper-2d-geojson'
import axios from 'axios';
const config = require('../config.js')
const mode = config.mode
var iso3311a2 = require('iso-3166-1-alpha-2')
/**
 * selectCountry - Specifies the style for the geojson
 *
 * @param  {String} country description
 * @return {object} style
 */
export const selectCountry = (country) => {
  console.log('You selected', country);
  if (mode != 'schools') {
    return {
      type: 'COUNTRY_SELECTED',
      // Not used  as using mode now
      payload: country
    }
  }
  return function(dispatch) {
    axios.get(window.location.origin + '/' +
        config.initial_url_key[mode] + '/countries/' + country)
      .catch(err => {
        alert('There was an error trying to do the initial fetch')
      })
      .then(response => {
        console.log(response);
        const headersList = response.data.result[0];
        const jsonData = response.data.result.slice(1)
        const points = arrToGeo(headersList, jsonData)
        const countryname = iso3311a2.getCountry(country)
        dispatch({
          type: 'COUNTRY_SELECTED',
          payload: {
            points: points,
            selectedCountry: country,
            selectedCountryName: countryname
          }
        })
      })
  }
}