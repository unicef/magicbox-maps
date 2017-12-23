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
        : 0.5,
      stroke: false
    }
    return displayCountry
  }
}

// /**
//  * countryStyle - Specifies the style for the geojson
//  *
//  * @param  {type} props description
//  * @return {object} style
//  */
// export function adminStyle(props) {
//   return function(geoJsonFeature) {
//     console.log(geoJsonFeature.properties.score )
//     const displayCountry = {
//       fill: true,
//       fillColor: 'red',
//       fillOpacity: geoJsonFeature.properties.score || 0,
//       stroke: false
//     }
//     return displayCountry
//   }
// }
