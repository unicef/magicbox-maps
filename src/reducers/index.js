import {
  combineReducers
} from 'redux';
import datesReducer from './reducer-dates';
import allCountriesReducer from './reducer-all-countries';
import initialLoadReducer from './initialLoadReducer';
import ActiveCountryReducer from './reducer-active-country';

const allReducers = combineReducers({
  activeCountry: ActiveCountryReducer,
  dates: datesReducer,
  allCountries: allCountriesReducer,
  initialCountries: initialLoadReducer
})

export default allReducers;
