import {
  combineReducers
} from 'redux';
import datesReducer from './reducer-dates';
import initialLoadReducer from './initialLoadReducer';

const allReducers = combineReducers({
  dates: datesReducer,
  initialCountries: initialLoadReducer,

})

export default allReducers;