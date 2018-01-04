/**
 * popUpString - description
 *
 * @param  {type} prop All the props and their value
 * @return {type}      returns a string with the popup string
 */
function popUpString(prop) {
  let output = '';
  if (prop.name != null) {
    output += 'Name: ' + prop.name + '<br>';
  }
  if (prop.address != null) {
    output += 'Address: ' + prop.address + '<br>';
  }
  if (prop.admin1 != null) {
    output += 'State/Region: ' + prop.admin1 + '<br>';
  }
  if (prop.admin2 != null) {
    output += 'County/District: ' + prop.admin2 + '<br>';
  }
  if (prop.admin3 != null) {
    output += 'Municipality/Community: ' + prop.admin3 + '<br>';
  }
  if (prop.admin4 != null) {
    output += 'Village/Neighborhood: ' + prop.admin4 + '<br>';
  }

  if (prop.altitude != null) {
    output += 'Altitude: ' + prop.altitude + '<br>';
  }
  if (prop.availability_connectivity != null) {
    let s = 'Available Connectivity: ' + prop.availability_connectivity + '<br>'
    output += s;
  }
  if (prop.connectivity != null) {
    output += 'Connectivity: ' + prop.connectivity + '<br>';
  }

  if (prop.datasource != null) {
    output += 'Source: ' + prop.datasource.split('-')[3] + '<br>';
  }
  if (prop.description != null) {
    output += 'Description: ' + prop.description + '<br>';
  }
  if (prop.educ_level != null) {
    output += 'Education Level: ' + prop.educ_level + '<br>';
  }
  if (prop.electricity != null) {
    let elec;
    if (prop.electricity) {
      elec = 'Yes';
    } else {
      elec = 'No';
    }
    output += 'Electricity: ' + elec + '<br>';
  }
  if (prop.environment != null) {
    output += 'Environment: ' + prop.environment + '<br>';
  }
  if (prop.frequency != null) {
    output += 'Frequency: ' + prop.frequency + '<br>';
  }
  if (prop.latency_connectivity != null) {
    output += 'Connectivity latency: ' + prop.latency_connectivity + '<br>';
  }
  if (prop.num_classrooms != null) {
    output += 'Number of Classrooms: ' + prop.num_classrooms + '<br>';
  }
  if (prop.num_latrines != null) {
    output += 'Number of Latrines: ' + prop.num_latrines + '<br>';
  }
  if (prop.num_sections != null) {
    output += 'Number of Sections: ' + prop.num_sections + '<br>';
  }
  if (prop.num_students != null) {
    output += 'Number of Students: ' + prop.num_students + '<br>';
  }
  if (prop.num_teachers != null) {
    output += 'Number of Teachers: ' + prop.num_teachers + '<br>';
  }

  if (prop.type_connectivity != null) {
    output += 'Connectivity Type: ' + prop.type_connectivity + '<br>';
  }
  if (prop.speed_connectivity != null) {
    output += 'Connectivity Speed: ' + prop.speed_connectivity + '<br>';
  }
  if (prop.type_conectivity != null) {
    output += 'Type of Connectivity: ' + prop.type_conectivity + '<br>';
  }
  if (prop.type_school != null) {
    output += 'Type of School: ' + prop.type_school + '<br>';
  }
  if (prop.water != null) {
    let water;
    if (prop.water) {
      water = 'Yes';
    } else {
      water = 'No';
    }
    output += 'Water: ' + water + '<br>';
  }
  return output;
}
export default popUpString;