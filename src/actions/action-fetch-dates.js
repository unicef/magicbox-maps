import axios from 'axios';
/**
 * countryStyle - Specifies the style for the geojson
 *
 * @param  {Object} data description
 * @return {Array}
 */
export function fetchDates(data) {
  // if (!data) {
  //   return []
  // }
  // return [[ new Date(2012, 3, 13), 37032 ]]
  return function(dispatch) {
    axios.get('http://localhost:8000/api/v1/mobility/sources/acme/series/santiblanko/countries/col')
      .catch(err => {
        alert('There was an error trying to do the initial fetch')
      })
      .then(res => {
        let dates = res.data.properties.map(
          csv => csv.substring(0, csv.indexOf('.'))
            .split('-').map(value => parseInt(value))
        )
        console.log(dates)
        dispatch({
          type: 'FETCH_DATES',
          payload: dates
        })
      })
  }
}
