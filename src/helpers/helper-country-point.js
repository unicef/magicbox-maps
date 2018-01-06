import L from 'leaflet';
import axios from 'axios';
/**
 * pointToLayer - makes point to layer
 *
 * @param  {type} feature features
 * @param  {type} latlng  latlng
 * @return {type} circleMarker
 */
export function pointToLayer(feature, latlng) {
  let marker = L.circleMarker(latlng, {
    color: 'white',
    fillColor: 'white',
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