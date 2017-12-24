import alasql from 'alasql'
alasql('CREATE TABLE mobilities ' +
'(origin string, destination string, people number)');

const mpio = require('../../public/data/mpio');
// List of scores to represent mobility toward each admin
// Order is by geoFeature index
let scores = []
// Keep a running tally of admins that user wants to compare
let selected_admins = {}

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
    let admin_index = mpio.features.reduce((h, f, i) => {
      h[f.properties.admin_id] = i;
      return h;
    }, {});
    // Create a lookup of admin_id to index in features array.
    return Object.assign({}, state, {
      geojson: mpio,
      admin_index: admin_index
    })
  case 'ADMIN_SELECTED':
    let admin_id = action.payload.target.feature.properties.admin_id
    // Add or remove admin_id to selected_admins object
    if (selected_admins[admin_id]) {
      delete selected_admins[admin_id]
    } else {
      selected_admins[admin_id] = 1
    }

    // If there are no selected admins
    // return scores: null
    // Admin styles will default to diagonal
    if (Object.keys(selected_admins).length == 0) {
      return Object.assign({}, state, {
        geojson: Object.assign({}, mpio),
        scores: null,
        selected_admins: selected_admins
      })
    }
    // USE THIS LATER TO ENABLE USER TO CLICK ADMIN MULTIPLE TIMES
    // TO INCREASE INTENSITY
    // selected_admins[admin_id] = selected_admins[admin_id] ?
    //   selected_admins[admin_id] + 1 : 1

    // Combines all vectors for clicked admins
    let combined_vectors = combine_vectors(state)

    // Reduce scores to between 0 and 1
    scores = get_scores(combined_vectors)
    return Object.assign({}, state, {
      geojson: Object.assign({}, mpio),
      scores: scores,
      selected_admins: selected_admins
    })

  case 'DATE_SELECTED':
    let lookup = state.admin_index
    let mobility = action.payload.mobility;
    let matrix = getMatrix(mobility, lookup);
    let diagonal = get_diagonal(matrix)

    scores = get_scores(diagonal)
    return Object.assign({}, state, {
      geojson: Object.assign({}, mpio),
      diagonal: scores,
      matrix: matrix
    })

  default:
    return state
  }
}

/**
 * Combines all vectors for clicked admins
 * @param  {Object} state
 * @return {Array} diagonal
 */
function combine_vectors(state) {
  let arys = Object.keys(selected_admins).map(admin_id => {
    console.log('Admin ids', admin_id)
    let admin_id_index = state.admin_index[admin_id]
    let values = state.matrix[state.admin_index[admin_id]] || []
    if (values.length > 1) {
      values[admin_id_index] = 0;
    }
    return values
  })
  console.log(arys.length, arys)
  return arys[0].map((_, i) =>
    // sum elements at the same index in array of arrays into a single array
    arys.reduce((p, item, j) => p + (arys[j][i] || 0), 0));
}

/**
 * Returns score between 0 and 1
 * @param  {Object} matrix
 * @return {Array} diagonal
 */
function get_diagonal(matrix) {
  let mmm = matrix.reduce((a, e, i) => {
    a[i] = matrix[i][i] || 0
    // console.log(a.length,i, matrix[i][i], '****')
    return a
  }, []);
  console.log(mmm, 'mmx')
  return mmm
}

/**
 * Returns score between 0 and 1
 * @param  {Integer} mobility
 * @param  {Integer} lookup
 * @return {Object} matrix
 */
function getMatrix(mobility, lookup) {
  // var hash = {};
  let hw = Object.keys(lookup).length;
  let matrix = mobility.reduce((ary, row, i) => {
    if (Array.isArray(ary[lookup[row.id_origin]])) {
      ary[lookup[row.id_origin]][lookup[row.id_destination]] =
      parseInt(row.people)
    } else {
      ary[lookup[row.id_origin]] = new Array(hw);
      ary[lookup[row.id_origin]][lookup[row.id_destination]] =
      parseInt(row.people)
    }

    return ary
  }, Array(hw))
  return matrix
}

/**
 * Returns array of scores between 0 and 1
 * @param  {Array} ary
 * @return {Boolean} score
 */
function get_scores(ary) {
  let max = ary.reduce(function(a, b) {
    return Math.max(a, b);
  });
  let min = ary.reduce(function(a, b) {
    return Math.min(a, b);
  });

  return ary.map(function(e) {
    return score(min, max, parseInt(e))
  })
}

/**
 * Returns score between 0 and 1
 * @param  {Integer} min
 * @param  {Integer} max
 * @param  {Integer} number
 * @return {boolean} score
 */
function score(min, max, number) {
  let score_min = min
  let score_max = max
  let low_bound = 0
  let top_bound = 1
  return (number - score_min) / (score_max - score_min) *
  (top_bound - low_bound) + low_bound
}

export default activeCountryReducer
