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
      if (alpha2 === 'CO') {
        console.log('COLLL!', activeCountry.geojson.features.length)
      }
      // Check if this country is one for which we have data.
      if (props.initialCountries.indexOf(alpha2) > -1) {
        // If a country has been clicked on...
        // and this is that country...
        // Don't display. That will happen with the activeCountry layer
        if (activeCountry.geojson.features.length > 0 &&
          alpha2.match(activeCountry.geojson.properties.alpha2)
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
