const mpio = require('../../public/data/mpio');
/**
 * Returns style for leaflet polygon
 * @param  {object} state state
 * @param  {object} action action
 * @return {boolean} boolean
 */
function activeCountryReducer(state = {
  // Just return blank geojson.
  // Note the alpha2 hack
  geojson: {'properties': {'alpha2': null, 'alpha3': null},
            'type': 'FeatureCollection',
            'features': []}
}, action) {
  switch (action.type) {
  case 'COUNTRY_SELECTED':
    return Object.assign({}, state, {
      geojson: mpio
    })
  default:
    return state
  }
}
export default activeCountryReducer
