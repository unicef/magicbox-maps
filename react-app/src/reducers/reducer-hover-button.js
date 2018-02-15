const initialstate = {
  display: false
}
/**
 * Calls initialLoad which loads initial data
 * @param  {Object} state state
 * @param  {Object} action action
 * @return {function} function
 */
export default function(state = initialstate, action) {
  switch (action.type) {
  case 'OPEN_DOCK':
    return Object.assign({}, state, {
      display: false
    })
  case 'DOCK_CLOSED':
    return Object.assign({}, state, {
      display: true
    })
  }
  return state;
}
