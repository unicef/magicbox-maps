export function fetchDates(data) {
  return function(dispatch) {
    fetch('http://localhost:8000/api/v1/mobility/sources/acme/series/santiblanko/countries/col', {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        }
      }).then(res => res.json())
      .then(res =>
        res.properties.map(res => res.substring(0, res.indexOf(".")).split("-")
          .map(value => parseInt(value)))
      )
      .then(res => {
        dispatch({
          type: 'FETCH_DATES',
          payload: res
        })
      })
  }
}