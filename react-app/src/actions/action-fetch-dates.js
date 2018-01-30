import axios from 'axios';
import {fetchMobilityForDate} from '../helpers/helper-general'
const config = require('../config.js')

/**
 * countryStyle - Specifies the style for the geojson
 *
 * @param  {Object} data description
 * @return {Array}
 */
export function fetchDates(data) {
  return function(dispatch) {
    axios.get(window.location.origin + '/' +
        config.initial_url_key[config.mode] + '/countries/' + data.id.toLowerCase())
      .catch(err => {
        alert('There was an error trying to do the initial fetch')
      })
      .then(res => {
        let dates = res.data.properties.map((csvFilename) => {
          // csv filename follows the format: YYYY-MM-DD^JOURNEYS-PEOPLE.csv
          let matches = csvFilename.match(/^(\d{4})-(\d{2})-(\d{2})\^(\d+)-(\d+)\.csv$/)

          // ignore elements not matching pattern
          if (!matches) {
            return null
          }

          return {
            date: new Date(+matches[1], +matches[2] - 1, +matches[3]),
            journeys: +matches[4],
            people: +matches[5],
            filename: csvFilename
          }
        }).filter((date) => !!date)

        dispatch({
          type: 'FETCH_DATES',
          payload: dates
        })

        fetchMobilityForDate(data.id.toLowerCase(), dates[0])
          .then(payload => {
            dispatch({
              type: 'DATE_SELECTED',
              payload: {
                date: payload,
                mobility: payload.data
              }
            })
          })
      })
  }
}
