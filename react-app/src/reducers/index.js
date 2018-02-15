import {
  combineReducers
} from 'redux';
import datesReducer from './reducer-dates';
import dateReducer from './reducer-active-date';
import allCountriesReducer from './reducer-all-countries';
import availableCountriesReducer from './reducer-available-countries';
import activeCountryReducer from './reducer-active-country';
import hoverButtonReducer from './reducer-hover-button';
import dockReducer from './reducer-dock';
import sliderChangedReducer from './reducer-slider-changed';


const allReducers = combineReducers({
  activeCountry: activeCountryReducer,
  dates: datesReducer,
  date: dateReducer,
  allCountries: allCountriesReducer,
  availableCountries: availableCountriesReducer,
  sliderChanged: sliderChangedReducer,
  hoverButton: hoverButtonReducer,
  dock: dockReducer
})

export default allReducers;
