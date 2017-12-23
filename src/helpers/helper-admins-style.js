/**
 * countryStyle - Specifies the style for the geojson
 *
 * @param  {type} props description
 * @return {object} style
 */
export function adminStyle(props) {
  return function(geoJsonFeature) {
    let admin_id = geoJsonFeature.properties.admin_id
    let active_country = props.activeCountry
    const displayCountry = {
      fill: true,
      fillColor: 'red',
      fillOpacity: active_country.diagonal ?
        (active_country.diagonal[props.activeCountry.admin_index[admin_id]]
        || 0)
        : Math.random(),
      stroke: false
    }
    return displayCountry
  }
}
