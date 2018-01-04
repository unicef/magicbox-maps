import arrToGeo from '../helpers/helper-2d-geojson'
import axios from 'axios';
const config = require('../config.js')
const mode = config.mode
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
        const headersList = response.data.result[0];
        const jsonData = response.data.result.slice(1)
        const points = arrToGeo(headersList, jsonData)
        dispatch({
          type: 'COUNTRY_SELECTED',
          payload: {
            points: points,
            selectedCountry: country
          }
        })
      })
  }
}
