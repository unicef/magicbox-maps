/**
 * countryStyle - Specifies the style for the geojson
 *
 * @param  {type} props description
 * @return {object} style
 */
export function adminStyle(props) {
  return function(geoJsonFeature) {
    console.log(geoJsonFeature.properties.score)
    const displayCountry = {
      fill: true,
      fillColor: 'red',
      fillOpacity: geoJsonFeature.properties.score || 0.5,
      stroke: false
    }
    return displayCountry
  }
}
