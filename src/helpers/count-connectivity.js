import connectivityColors from './connectivity-colors';

function countConnectivity(schools) {
  let numHigh = 0; // Above 3Mbps
  let numLow = 0; // Below 3Mbps
  let numNone = 0; // No connectivity
  let numUnknown = 0;

  // Currently, the school JSON only has colors, not the connectivity level.
  // In the future, consider placing the connectivity level into the
  // school data and basing the color on that, rather than the other way around.

  // We're comparing the red channel of each color to avoid having to do a more
  // processor-intense comparison of the whole array.

  schools.forEach(school => {
    switch (school.properties.color[0]) {
      case connectivityColors.colorHigh[0]:
        numHigh++;
        break;
      case connectivityColors.colorLow[0]:
        numLow++;
        break;
      case connectivityColors.colorNone[0]:
        numNone++;
        break;
      case connectivityColors.colorUnknown[0]:
      default:
        numUnknown++;
        break;
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
