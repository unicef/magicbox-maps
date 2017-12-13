function datepickerReducer(state = {dateArray: []}, action){

  switch (action.type) {
    case "FETCH_DATES":
    // data point hard coded temporarily for visibility
    let newDates = action.payload.map( array => [new Date(array[0], array[1], array[2]), 35000])
    return Object.assign({}, state, {dateArray: newDates})
    //
    // case "FETCH_DATES_ERROR":
    //   return state
    //   console.log(error)

    default:
      return state
  }
}
export default datepickerReducer
