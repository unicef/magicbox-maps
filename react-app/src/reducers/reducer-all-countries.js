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
