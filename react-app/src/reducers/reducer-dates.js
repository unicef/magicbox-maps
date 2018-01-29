function datesReducer(state = {
  // Set defualt junk dates
  dateArray: [ {
    date: new Date(1981, 3, 13),
    journeys: 37032,
    people: 37032,
    filename: ''
  } ],
  visibility: 'hidden'
}, action) {

  switch (action.type) {
    case 'FETCH_DATES':
      // data point hard coded temporarily for visibility
      return Object.assign({}, state, {
        dateArray: action.payload,
        visibility: 'visible'
      })

    default:
      return state
  }
}
export default datesReducer
