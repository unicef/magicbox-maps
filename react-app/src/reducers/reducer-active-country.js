import {
  combine_vectors
} from '../helpers/helper-general'
import {
  get_diagonal
} from '../helpers/helper-general'
import {
  getMatrix
} from '../helpers/helper-general'
import {
  get_scores
} from '../helpers/helper-general'
const config = require('../config.js')

const mpio = require('../data/mpio');
// List of scores to represent mobility toward each admin
// Order is by geoFeature index
let scores = []
let combined_vectors = []
// Keep a running tally of admins that user wants to compare
let selected_admins = {}
let geojson = {
  'properties': {
    'alpha2': null,
    'alpha3': null
  },
  'type': 'FeatureCollection',
  'features': []
}
let initial_state = {
  geojson: geojson,
  points: geojson,
  selectedCountry: null,
  selectedCountryName: " . ",
  selectedCountryNumSchools: null,
  selectedCountryAvgMbps: null,

}

/**
 * Returns style for leaflet polygon
 * @param  {object} state state
 * @param  {object} action action
 * @return {boolean} boolean
 */
function activeCountryReducer(state = initial_state, action) {
  switch (action.type) {
    case 'COUNTRY_SELECTED':
      // Create a lookup of admin_id to index in features array.
      let admin_index = mpio.features.reduce((h, f, i) => {
        h[f.properties.admin_id] = i;
        return h;
      }, {});
      if (config.mode !== 'schools') {
        return Object.assign({}, state, {
          geojson: mpio,
          admin_index: admin_index
        })
      } else {
        return Object.assign(action.payload, {
          geojson: geojson
        })
      }
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
        diagonal = state.diagonal
        scores = get_scores(diagonal)
        return Object.assign({}, state, {
          geojson: Object.assign({}, mpio),
          scores: scores,
          selected_admins: selected_admins
        })
      }
      // USE THIS LATER TO ENABLE USER TO CLICK ADMIN MULTIPLE TIMES
      // TO INCREASE INTENSITY
      // selected_admins[admin_id] = selected_admins[admin_id] ?
      //   selected_admins[admin_id] + 1 : 1
      // Combines all vectors for clicked admins
      combined_vectors = combine_vectors(
        state.admin_index,
        state.matrix,
        selected_admins
      )
      // Reduce scores to between 0 and 1
      scores = get_scores(combined_vectors, [])

      return Object.assign({}, state, {
        geojson: Object.assign({}, mpio),
        scores: scores,
        selected_admins: selected_admins
      })

      // On date select, there may be admins selected from
      // from a previous date fetch
    case 'DATE_SELECTED':
      // Create dictionary of admin_id to index feature in geojson
      let lookup = state.admin_index
      let mobility = action.payload.mobility;
      let matrix = getMatrix(mobility, lookup);

      // Diagonal is each admin_id and the num people
      // who only made calls within that admin
      let diagonal = get_diagonal(matrix)

      // IN CASE MORE THAN ONE ADMIN IS ALREADY CLICKED
      // Combines all vectors for clicked admins
      // Check selected admins exist from previous date select
      if (Object.keys(selected_admins).length > 0) {
        admin_index = state.admin_index || admin_index
        selected_admins = state.selected_admins || selected_admins
        combined_vectors = combine_vectors(admin_index, matrix, selected_admins)
        scores = get_scores(combined_vectors, [])
      } else {
        // Map values to scores between 0 and 1
        scores = get_scores(diagonal)
      }

      return Object.assign({}, state, {
        geojson: Object.assign({}, mpio),
        diagonal: diagonal,
        matrix,
        // Set scores to null in case admins were previously selected
        scores: scores
      })

    default:
      return state
  }
}

export default activeCountryReducer