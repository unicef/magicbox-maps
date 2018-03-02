import axios from 'axios';
import popUpString from './helper-popup-string';

/**
 * pointClick - makes point to layer
 *
 * @param  {Number} school_id
 * @param  {Obj} map
 * @param  {String} fetch_url
 */
export default function pointClick(feature, map, fetch_url) {
  let url = fetch_url + feature.properties.id;
  axios.get(url)
    .catch(err => {
      alert('There was an error trying to get school info')
    })
    .then(response => {
      let labels = response.data.result[0];
      let data = response.data.result[1]
      // let lat_index = labels.findIndex(function(e) {
      //   return e.match(/^lat$/)
      // })
      // let lon_index = labels.findIndex(function(e) {
      //   return e.match(/^lon$/)
      // })
      let message = popUpString(labels, data)
      map.openPopup(message, feature.geometry.coordinates.reverse())
    })
}
