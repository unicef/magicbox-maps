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
    axios.get(window.location.origin + '/' +
        config.initial_url_key[mode] + '/countries/')
      .catch(err => {
        alert('There was an error trying to do the initial fetch')
      })
      .then(response => {
        dispatch({
          type: 'INITIAL_LOAD',
          payload: {
            availableCountries: response.data.properties
          }
        })

        dispatch({type: 'RECEIVE_DATA'})
      })
  }
}

export default fetchAvailableCountries;
