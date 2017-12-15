import axios from 'axios';
var config = require('../config.js')
const InitialLoad = () => {
  // console.log("IN IL");
  return function(dispatch) {
    axios.get(window.location.href + config.init_map_url)
      .catch(err => {
        alert('There was an error trying to do the initial fetch')
      })
      .then(response => {
        // console.log(response.data.countries);
        dispatch({
          type: 'INITIAL_LOAD',
          payload: {
            initialCountries: response.data.countries,
          }
        })
      })
  }
}

export default InitialLoad;