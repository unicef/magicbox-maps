const GeoJSON = require('geojson');

/**
 * makes a 2d array to geojson
 * @param {object} params headers
 * @param {object} data data
 * @return {object} returns geojson
 */
const arrToGeo = (params, data) => {
  const toGeo = []
  for (const i = 0; i < data.length; i++) {
    const o = {}
    for (const j = 0; j < params.length; j++) {
      o[params[j]] = data[i][j]
    }
    toGeo[i] = o;
  }
  return GeoJSON.parse(toGeo, {
    Point: ['lat', 'lon']
  });
}
export default arrToGeo;