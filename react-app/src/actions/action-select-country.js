import arrToGeo from '../helpers/helper-2d-geojson'
import axios from 'axios';
const config = require('../config.js')
const mode = config.mode
const iso3311a2 = require('iso-3166-1-alpha-2')
/**
 * selectCountry - Specifies the style for the geojson
 *
 * @param  {String} country description
 * @param  {Number} sliderVal selected slider value
 * @return {object} style
 */
export const selectCountry = (country, sliderVal) => {
  console.log('You selected', country);
  if (mode !== 'schools') {
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
        // console.log(response);
        const headersList = response.data.result[0];
        const jsonData = response.data.result.slice(1)
        const points = arrToGeo(headersList, jsonData)
        const countryname = iso3311a2.getCountry(country)
        const numSchools = response.data.result.length - 1;
        // console.log(response.data.result[0]);
        let nschools = 0;
        let speedschools = 0;
        let speedresult = null;
        let belowT = 0;
        let zeroT = 0;
        let aboveT = 0;
        let nullT = 0;

        let types = {
          'null': 0,
          'No Service': 0,
          '2G': 0,
          '3G': 0
        }
        console.log(response.data.result[0]);
        for (let i = 1; i < response.data.result.length; i++) {
          if (response.data.result[i][3] !== null) {
            speedschools += response.data.result[i][3];
            nschools++;
            if (response.data.result[i][3] == 0) {
              zeroT++;
            } else if (response.data.result[i][3] < sliderVal) {
              belowT++;
            } else if (response.data.result[i][3] >= sliderVal) {
              aboveT++;
            }
          } else {
            nullT++;
          }
          if (response.data.result[i][4] in types) {
            types[response.data.result[i][4]] += 1;
          } else {
            types[response.data.result[i][4]] = 1;
          }
        }

        if (nullT > types['null']) {
          console.log('type');
          zeroT = types['No Service'];
          belowT = types['2G'];
          aboveT = response.data.result.length - types['No Service'] -
            types['2G'] - types['null'];
          nullT = types['null'];
        }

        console.log(types);

        if (speedschools === 0) {
          speedresult = null;
        } else {
          speedresult = speedschools / nschools
          speedresult = speedresult.toFixed(2)
        }

        // console.log(points);

        dispatch({
          type: 'COUNTRY_SELECTED',
          payload: {
            points: points,
            selectedCountry: country,
            selectedCountryName: countryname,
            selectedCountryNumSchools: numSchools,
            selectedCountryAvgMbps: speedresult
          }
        })

        dispatch({
          type: 'SLIDER_CHANGED',
          payload: {
            aboveT: aboveT,
            belowT: belowT,
            zeroT: zeroT,
            nullT: nullT,
            sliderVal: sliderVal
          }
        })
      })
  }
}
