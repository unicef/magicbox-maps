import L from 'leaflet';
import axios from 'axios';

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
  console.log(e.target.feature.geometry.coordinates);
  let lat = e.target.feature.geometry.coordinates[1];
  let lon = e.target.feature.geometry.coordinates[0];
  console.log(window.location.origin + '/weather?lat=' + lat + '&lon=' + lon);
  axios.get(window.location.origin + '/weather?lat=' + lat + '&lon=' + lon)
    .catch(err => {
      alert('There was an error trying to do the initial fetch')
    })
    .then(response => {
      console.log(response);
      popup.setContent(response.data.description)
      popup.update();
    })
  console.log(popup);
}