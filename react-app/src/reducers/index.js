import {
  combineReducers
} from 'redux';
import datesReducer from './reducer-dates';
import dateReducer from './reducer-active-date';
import allCountriesReducer from './reducer-all-countries';
import activeCountriesReducer from './reducer-active-countries';
import activeCountryReducer from './reducer-active-country';
import sliderChangedReducer from './reducer-slider-changed';


const allReducers = combineReducers({
  activeCountry: activeCountryReducer,
  dates: datesReducer,
  date: dateReducer,
  allCountries: allCountriesReducer,
  activeCountries: activeCountriesReducer,
  sliderChanged: sliderChangedReducer
})

export default allReducers;