const SliderChange = function(geojson, sliderVal) {
  return function(dispatch) {
    let belowT = 0;
    let zeroT = 0;
    let aboveT = 0;
    let nullT = 0;
    for (let i = 0; i < geojson.features.length; i++) {
      let speed = geojson.features[i].properties.speed_connectivity;
      if (speed !== null) {
        if (speed == 0) {
          zeroT++;
        } else if (speed < sliderVal) {
          belowT++;
        } else if (speed >= sliderVal) {
          aboveT++;
        }
      } else {
        nullT++;
      }
    }
    dispatch({
      type: 'SLIDER_CHANGED',
      payload: {
        aboveT: aboveT,
        belowT: belowT,
        zeroT: zeroT,
        nullT: nullT,
        sliderVal: sliderVal
      }
    })
  }
}
export default SliderChange;