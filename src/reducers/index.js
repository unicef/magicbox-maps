import {combineReducers} from 'redux';
import datesReducer from './reducer-dates';

const allReducers = combineReducers({
  dates: datesReducer
})

export default allReducers
