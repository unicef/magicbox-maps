const config = require('../config.js')

/**
 * onEachCountryFeature
 *
 * @param {object} myMapObj
 * @param {number} sliderVal value
 * @param {object} availableCountryPaths
 * @return {function} function
 */
export function onEachCountryFeature(
  myMapObj,
  sliderVal,
  availableCountryPaths
) {
  return (feature, layer) => {
    layer.on({
      'mouseover': (e) => {
        layer.setStyle({
          fillOpacity: 0.7
        });
      },
      'mouseout': e => {
        layer.setStyle({
          fillOpacity: 0.5
        })
      },
      'click': e => {
        // An admin 0 has been clicked
        if (feature.base_country) {
          centerCountry(myMapObj, e.latlng, 6);
          // Fetch dates for country
          // this.props.fetchDates()
        }
        if (config.mode != 'schools') {
          myMapObj.props.selectCountry(
            e.target.feature,
            sliderVal,
            availableCountryPaths[e.target.feature.id.toLowerCase()]
          );
        } else {
          myMapObj.props.selectCountry(e.target.feature.id, sliderVal);
          myMapObj.setState({
            didUpdate: false,
            docker: true
          })
        }
      }
    });
  }
}

/**
 * enterCountry
 * @param {object} myMapObj
 * @param {object} latlng
 * @param {object} lev
 */
function centerCountry(myMapObj, latlng, lev) {
  myMapObj.map.leafletElement.flyTo(latlng, lev);
}
