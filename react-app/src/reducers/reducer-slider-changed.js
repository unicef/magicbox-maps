const initialstate = {
  aboveT: 1,
  belowT: 1,
  zeroT: 1,
  nullT: 1,
  sliderVal: 3
}
/**
 * Calls initialLoad which loads initial data
 * @param  {Object} state state
 * @param  {Object} action action
 * @return {function} function
 */
export default function(state = initialstate, action) {
  switch (action.type) {
    case 'SLIDER_CHANGED':
      return action.payload;
  }
  return state;
}