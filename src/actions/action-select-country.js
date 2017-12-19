/**
 * selectCountry - Specifies the style for the geojson
 *
 * @param  {String} country description
 * @return {object} style
 */
export const selectCountry = country => {
  console.log('You selected', country);
  return {
    type: 'COUNTRY_SELECTED',
    payload: country
  }
}
