const initialState = false

/**
 * @param  {Object} state state
 * @param  {Object} action action
 * @return {Object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
  case 'REQUEST_DATA':
    return true
  case 'RECEIVE_DATA':
    return false
  }
  return state;
}
