import {fetchMobilityForDate} from '../helpers/helper-general'
/**
 * selectDate - Specifies the style for the geojson
 *
 * @param  {String} date description
 * @return {object} dispatch
 */
export const selectDate = function(date) {
  return function(dispatch) {
    fetchMobilityForDate(date)
    .then(data => {
      dispatch({
        type: 'DATE_SELECTED',
        payload: {
          date: date,
          mobility: data.data
        }
      })
    })
  }
}