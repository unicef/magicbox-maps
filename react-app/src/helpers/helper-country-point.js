import axios from 'axios';
import popUpString from './helper-popup-string';
const config = require('../config.js')
const mode = config.mode

/**
 * getStyle - sets style for dot
 *
 * @param  {type} val  value of speed (MBPS)
 * @param  {type} type type of speed (2G, 3G, LTE, etc)
 * @return {type}      color for dot
 */
function getStyle(val, type, slider) {

  let value = null;
  if (typeof val !== 'undefined' && val !== null) {
    value = val;
  } else if (typeof type !== 'undefined' && type != null) {
    value = type;
  }

  if (value === null) {
    return '#6A1E74';
  } else if (value === 0 || value === 'No Service') {
    return '#d9534f';
  } else if (value >= slider || value === '3G') {
    return '#5cb85c';
  } else if (value < slider || value === '2G') {
    return '#F5A623';
  } else {
    return '#DCDCDC';
  }
}

/**
 * pointToLayer - makes point to layer
 *
 * @param  {type} feature features
 * @param  {type} latlng  latlng
 * @return {type} circleMarker
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
      let lat_index = labels.findIndex(e => {return e.match(/^lat$/)})
      let lon_index = labels.findIndex(e => {return e.match(/^lon$/)})
      let message = popUpString(labels, data)
      window.aaa = labels;
      window.bbb= data;
      // console.log(message, 'Mmmm', lat_index, lon_index, data)
      map.openPopup(message, [data[lat_index], data[lon_index]])
    })
  // console.log(popup);
}
