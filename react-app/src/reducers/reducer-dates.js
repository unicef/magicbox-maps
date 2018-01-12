function datesReducer(state = {
  // Set defualt junk dates
  dateArray: [[ new Date(1981, 3, 13), 37032 ]],
  visibility: 'hidden'
}, action) {

  switch (action.type) {
    case 'FETCH_DATES':
      // data point hard coded temporarily for visibility
      let newDates = action.payload.map(array => [new Date(array[0], array[1], array[2]), 35000])

      return Object.assign({}, state, {
        dateArray: newDates,
        visibility: 'visible'
      })

    default:
      return state
  }
}
export default datesReducer
