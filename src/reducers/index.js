import {
  combineReducers
} from 'redux';
import datesReducer from './reducer-dates';
import dateReducer from './reducer-active-date';
import allCountriesReducer from './reducer-all-countries';
import initialLoadReducer from './initialLoadReducer';
import ActiveCountryReducer from './reducer-active-country';

const allReducers = combineReducers({
  activeCountry: ActiveCountryReducer,
  dates: datesReducer,
  date: dateReducer,
  allCountries: allCountriesReducer,
  initialCountries: initialLoadReducer
})

export default allReducers;
