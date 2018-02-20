import axios from 'axios';
import popUpString from './helper-popup-string';
const config = require('../config.js')
const mode = config.mode


/**
 * assign_speed_value - sets style for dot
 *
 * @param {type} properties  object
 * @return {type} color for dot
 */
export function assign_speed_value(properties) {
  let slider = 3
  let value = null;
  if (properties.speed_connectivity !== null &&
    typeof properties.speed_connectivity !== 'undefined'
  ) {
    value = properties.speed_connectivity;
  } else if (properties.type_connectivity !== null) {
    value = properties.type_connectivity;
  }

  if (typeof value === 'undefined') {
    // return '#6A1E74';
    return [106, 30, 116]
  } else if (value === 0 || value === 'No Service') {
    // return '#d9534f';
    return [217, 83, 79]
  } else if (value >= slider || value === '3G') {
    // return '#5cb85c';
    return [92, 184, 92]
  } else if (value < slider || value === '2G') {
    // return '#F5A623';
    return [245, 166, 35]
  } else {
    // return '#DCDCDC';
    return [1, 1, 1]
  }
}

/**
 * pointToLayer - makes point to layer
 *
 * @param  {Number} school_id
 * @param  {Obj} map
 */
export function pointToLayer(school_id, map) {
  let url = window.location.origin + '/' +
    config.initial_url_key[mode] +
    '/school/' + school_id;
  console.log(url);
  axios.get(url)
    .catch(err => {
      alert('There was an error trying to get school info')
    })
    .then(response => {
      let labels = response.data.result[0];
      let data = response.data.result[1]
      let lat_index = labels.findIndex(function(e) {
        return e.match(/^lat$/)
      })
      let lon_index = labels.findIndex(function(e) {
        return e.match(/^lon$/)
      })
      let message = popUpString(labels, data)
      window.aaa = labels;
      window.bbb= data;
      // console.log(message, 'Mmmm', lat_index, lon_index, data)
      map.openPopup(message, [data[lat_index], data[lon_index]])
    })
  // console.log(popup);
}
