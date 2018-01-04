import L from 'leaflet';
import popUpString from './helper-country-message';
/**
 * pointToLayer - makes point to layer
 *
 * @param  {type} feature features
 * @param  {type} latlng  latlng
 * @return {type} circleMarker
 */
export function pointToLayer(feature, latlng) {
  return L.circleMarker(latlng, {
    color: 'white',
    fillColor: 'white',
    fillOpacity: .8,
    radius: 3,
    stroke: false
  }).bindPopup(popUpString(feature.properties)) // Change marker to circle
}