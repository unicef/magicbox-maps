import L from 'leaflet';
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
  return L.circleMarker(latlng, {
    color: getStyle(val, type),
    fillColor: getStyle(val, type),
    fillOpacity: .8,
    radius: 3,
    stroke: false
  }).bindPopup('MESSAGE') // Change marker to circle
}