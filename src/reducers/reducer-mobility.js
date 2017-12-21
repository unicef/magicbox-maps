import alasql from 'alasql'
// alasql('CREATE TABLE mobilities ' +
// '(origin string, destination string, people number)');
/**
 * Returns style for leaflet polygon
 * @param  {object} state state
 * @param  {object} action action
 * @return {boolean} boolean
 */
function activeCountryReducer(state = {
  // Just return blank geojson.
  // Note the alpha2 hack
  // geojson: {'properties': {'alpha2': null, 'alpha3': null},
  //           'type': 'FeatureCollection',
  //           'features': []}
}, action) {
  switch (action.type) {
  case 'DATE_SELECTEDD':
    let mobility = bucketBy(action.payload.mobility);

    mobility.forEach((e, i) => {
      if (i%10==0) {
        console.log(i)
      }
      alasql('INSERT INTO mobilities VALUES ' + e)
    //
    //   alasql("INSERT INTO mobilities VALUES ('" +
    //   e.id_origin + "','" +
    //   e.id_destination + "','" + e.people + "')");
    })
    //
    let res = alasql('SELECT origin, people FROM mobilities ' +
    'where origin = destination;');
    let range = alasql('select min(people) as min, max(people) ' +
    'as max from mobilities where origin = destination');
    let min = range[0].min;
    let max = range[0].max
    let score_table = res.reduce((h, r) => {
      h[r.origin] = score(min, max, r.people);
      return h
    }, {})

    return Object.assign({}, state, {
      mobility: score_table
    })
  default:
    return state
  }
}

/**
 * Returns score between 0 and 1
 * @param  {Integer} min
 * @param  {Integer} max
 * @param  {Integer} number
 * @return {boolean} score
 */
function score(min, max, number) {
  let score_min = min
  let score_max = max
  let low_bound = 0
  let top_bound = 1
  return (number - score_min) / (score_max - score_min) *
  (top_bound - low_bound) + low_bound
}

/**
 * Returns array in buckets
 * @param  {array} ary state
 * @return {boolean} boolean
 */
function bucketBy(ary) {
  let groupSize = 300;
  return ary.map(function(item, index) {
    return index % groupSize === 0 ?
      ary.slice(index, index + groupSize)
        .map(function(e) {
          return '(\'' + e.id_origin + '\', \'' +
            e.id_destination + '\', ' +
            e.people + ')'
        })
      : null;
  })
    .filter(function(item) {
      return item
    });
}
export default activeCountryReducer
