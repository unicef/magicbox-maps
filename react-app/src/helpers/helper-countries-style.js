import {
  alpha3ToAlpha2
} from 'i18n-iso-countries';
/**
 * countryStyle - Specifies the style for the geojson
 *
 * @param  {type} props description
 * @return {object} style
 */
export function countryStyle(props) {
  return function(geoJsonFeature) {
    let activeCountry = props.activeCountry;
    const displayCountry = {
      fill: true,
      fillColor: '#0099FF',
      fillOpacity: 0.5,
      stroke: false
    }
    const nullDisplay = {
      fill: false,
      fillColor: '#0099FF',
      fillOpacity: 0,
      stroke: false
    }
    // base_country indicates this is an admin 0
    // from valid countries array.
    if (geoJsonFeature.base_country) {
      let alpha2 = alpha3ToAlpha2(geoJsonFeature.id);
      // Check if this country is one for which we have data.
      if (props.activeCountries.indexOf(alpha2) > -1) {
        // If a country has been clicked on...
        // and this is that country...
        // Don't display. That will happen with the activeCountry layer
        let selectedCountry = activeCountry.selectedCountry ||
          activeCountry.geojson.properties.alpha2

        // Points are schools, geojson is mobility now
        let geometry = (activeCountry.points.features.length > 0) ?
          activeCountry.points : activeCountry.geojson
        if (geometry.features.length > 0 &&
          alpha2.match(selectedCountry)
        ) {
          return nullDisplay;
        }
        return displayCountry;
      } else {
        return nullDisplay;
      }
    }
    return displayCountry
  }
}