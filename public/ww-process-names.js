self.onmessage = (event) => {
  // Store school names
  let schoolNames = event.data[0].features.map((feature) => {
    // Get school name
    return feature.properties.name
  })

  // regions
  let regionNames = event.data[1].features.map((feature) => {
    // get all region names from geojson
    return [
      feature.properties.NOMBRE_D,
      feature.properties.NOMBRE_M,
      feature.properties.NOMBRE_C
    ]
  }).reduce((acc, el) => {
    // join all names in the same array
    return acc.concat(el)
  }, [])
  
  // convert unique names to options
  let options = [].concat(schoolNames, regionNames).filter((el, i, self) => {
    // filter for unicity
    return self.indexOf(el) === i
  }).map((name) => {
    return {
      value: name,
      label: name,
      className: 'search__option'
    }
  })

  // send message
  self.postMessage(options)
}
