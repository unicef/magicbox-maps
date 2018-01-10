import L from 'leaflet';
import axios from 'axios';
import popUpString from './helper-popup-string';
const config = require('../config.js')
const mode = config.mode

/**
 * getStyle - sets style for dot
 *
 * @param  {type} val  value of speed ( mbps)
 * @param  {type} type type of speed ( 2G, 3G, etc)
 * @return {type}      color fo dot
 */
function getStyle(val, type) {
  let value = null;
  if (val !== null) {
    value = val;
  } else if (type != null) {
    value = type;
  }
  if (value === null) {
    return '#6A1E74';
  } else if (value === 0 || value === 'No Service') {
    return '#d9534f';
  } else if (value >= 3 || value === '3G') {
    return '#5cb85c';
  } else if (value < 3 || value === '2G') {
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
export function pointToLayer(feature, latlng) {
  let val = feature.properties.speed_connectivity;
  let type = feature.properties.type_connectivity
  let marker = L.circleMarker(latlng, {
    color: getStyle(val, type),
    fillColor: getStyle(val, type),
    fillOpacity: .8,
    radius: 3,
    stroke: false
  }).bindPopup('LOADING...') // Change marker to circle
  marker.on('click', onDotClick)
  return marker;
}

/**
 * onMapClick - On click function for dot
 *
 * @param  {type} e event
 */
function onDotClick(e) {
  console.log('in mapclick');
  let popup = e.target.getPopup();
  let school_id = e.target.feature.properties.id;
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
      let message = popUpString(labels, data)
      popup.setContent(message)
      popup.update();
    })
  console.log(popup);
}