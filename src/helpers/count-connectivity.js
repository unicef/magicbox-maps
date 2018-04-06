function countConnectivity(schools) {
  let numHigh = 0; // Above 3Mbps
  let numLow = 0; // Below 3Mbps
  let numNone = 0; // No connectivity
  let numUnknown = 0;

  schools.forEach(school => {
    let speed = school.properties.speed_connectivity;
    if (speed >= 3) {
      numHigh++;
    } else if (speed > 0) {
      numLow++;
    } else if (speed === 0) {
      numNone++;
    } else {
      numUnknown++;
    }
  });

  return {
    numHigh,
    numLow,
    numNone,
    numUnknown
  };
}

export default countConnectivity;
