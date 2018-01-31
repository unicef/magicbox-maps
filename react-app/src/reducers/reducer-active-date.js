import commaNumber from 'comma-number'
const initialstate = {
}
/**
 * Calls initialLoad which loads initial data
 * @param  {Object} state state
 * @param  {Object} action action
 * @return {function} function
 */
export default function(state = initialstate, action) {
  switch (action.type) {
  case 'DATE_SELECTED':
    let dateObj = new Date(action.payload.date.date);
    let month = dateObj.getUTCMonth() + 1; // months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newdate = year + '/' + month + '/' + day;
    return Object.assign({}, state, {
      day: newdate,
      journeys: commaNumber(action.payload.date.journeys),
      people: commaNumber(action.payload.date.people)
    })
  }
  return state;
}
