const initialstate = {
  initialCountries: []
}
/**
 * Calls initialLoad which loads initial data
 * @param  {Object} state state
 * @param  {Object} action action
 * @return {function} function
 */
export default function(state = initialstate, action) {
  switch (action.type) {
  case 'INITIAL_LOAD':
    return action.payload;
  }
  return state;
}
