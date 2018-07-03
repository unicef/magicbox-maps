// import axios from 'axios';
// import popUpString from './helper-popup-string';
// const config = require('../config.js')
// const mode = config.mode
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
