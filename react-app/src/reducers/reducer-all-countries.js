const world_geojson = require('../data/countries');
/**
 * Returns style for leaflet polygon
 * @param  {object} state state
 * @param  {object} action action
 * @return {object} geojson
 */
export default function(state = null, action) {
  return world_geojson;
}
// world_geojson.features.forEach(f => {
//   if (f.id.match(/COL/)) {
//     f = mpio
//   }
// })
// return world_geojson
// switch(action.type){
//   case 'COUNTRY_SELECTED':
//   return mpio
//     return action.payload
//     break;
// }

// /**
//  * geojsonReducer
//  * @param {type} state description
//  * @param {Object} action
//  * @return {Object} description
//  */
// function geojsonReducer(state = {
//   geojson: word_geojson
// }, action) {
//   switch (action.type) {
//   case 'FETCH_COUNTRY':
//     // data point hard coded temporarily for visibility
//     let newDates = action.payload.map((ary) => {
//       return [
//         new Date(ary[0], ary[1], ary[2]),
//         35000
//       ]
//     })
//     return Object.assign({}, state, {
//       dateArray: newDates
//     })
//
//   default:
//     return state
//   }
// }
// export default geojsonReducer
