import arrToGeo from '../helpers/helper-2d-geojson'
import axios from 'axios';
const config = require('../config.js')
/**
 * selectCountry - Specifies the style for the geojson
 *
 * @param  {String} country description
 * @return {object} style
 */
export const selectCountry = (country) => {
  console.log('You selected', country);
  return function(dispatch) {
    let geojson = null;
    console.log(window.location.href + config.mode + '/countries/' + country);
    axios.get(window.location.href + config.mode + '/countries/' + country)
      .catch(err => {
        alert('There was an error trying to do the initial fetch')
      })
      .then(response => {
        const headersList = response.data.result[0];
        const jsonData = response.data.result.slice(1)
        geojson = arrToGeo(headersList, jsonData)
        console.log('action', geojson);
        dispatch({
          type: 'COUNTRY_SELECTED',
          payload: {
            geojson: geojson,
            selectedCountry: country
          }
        })
      })
  }
}