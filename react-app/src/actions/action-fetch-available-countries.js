import axios from 'axios';
const config = require('../config.js')
const mode = config.mode
/**
 * InitialLoad - Calls initialLoad which loads initial data
 * @return {function} function
 */
const fetchAvailableCountries = function() {
  return function(dispatch) {
    dispatch({type: 'REQUEST_DATA'})
    // Fetch all countries for which we have data for schools (mobility later)
    let url = window.location.origin + '/' +
        config.initial_url_key[mode] + '/countries/'
    axios.get(url)
      .catch(err => {
        alert('There was an error trying to do the initial fetch')
      })
      .then(response => {
        let countries = []
        let res = response.data
        countries = mode.match(/schools/) ? res.properties
          : response.data.reduce((h, obj) => {
            h[obj.country] = obj.path
            return h
          }, {})
        dispatch({
          type: 'INITIAL_LOAD',
          payload: {
            availableCountries: countries
          }
        })

        dispatch({type: 'RECEIVE_DATA'})
      })
  }
}

export default fetchAvailableCountries;
