/**
 * selectDate - Specifies the style for the geojson
 *
 * @param  {String} state
 * @param  {String} action
 * @return {object}
 */
export default function(state = null, action) {
  switch (action.type) {
  case 'DATE_SELECTED':
    return Object.assign({}, state, {
      date: action.payload.date
    })

  default:
    return state
  }
}
