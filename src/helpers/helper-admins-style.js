/**
 * countryStyle - Specifies the style for the geojson
 *
 * @param  {type} props description
 * @return {object} style
 */
export function adminStyle(props) {
  return function(geoJsonFeature) {
    const displayCountry = {
      fill: true,
      fillColor: 'red',
      fillOpacity: Math.random(),
      stroke: false
    }
    return displayCountry
  }
}
