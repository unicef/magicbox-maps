import {
  combineReducers
} from 'redux';
import datesReducer from './reducer-dates';
<<<<<<< HEAD
import initialLoadReducer from './initialLoadReducer';

const allReducers = combineReducers({
  dates: datesReducer,
  initialCountries: initialLoadReducer,

})

export default allReducers;
=======
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
>>>>>>> refactor_and_rename_fetch_date_and_csv
