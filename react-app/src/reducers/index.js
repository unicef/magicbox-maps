import {
  combineReducers
} from 'redux';
import datesReducer from './reducer-dates';
import dateReducer from './reducer-active-date';
import allCountriesReducer from './reducer-all-countries';
import availableCountriesReducer from './reducer-available-countries';
import activeCountryReducer from './reducer-active-country';
import sliderChangedReducer from './reducer-slider-changed';
import loadingDataReducer from './reducer-loading-data-status'


const allReducers = combineReducers({
  activeCountry: activeCountryReducer,
  dates: datesReducer,
  date: dateReducer,
  allCountries: allCountriesReducer,
  availableCountries: availableCountriesReducer,
  sliderChanged: sliderChangedReducer,
  loading: loadingDataReducer
})

export default allReducers;
