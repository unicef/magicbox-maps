/**
 * popUpString - created pop up string
 *
 * @param {type} labels labels of data
 * @param {type} data   actual data
 *
 * @return {type} returns string of labels
 */
const popUpString = (labels, data) => {
  // We get back a two dimensional array
  // Labels is the first element, ie. the list of column names
  // Data are the rows
  let output = '';
  for (let i = 0; i < labels.length; i++) {
    if (data[i] !== null &&
      data[i].toString().replace(/\s/g, '') !== '') {
      output += labels[i] + ': ' + data[i] + '<br>';
    }
  }
  return output;
}
export default popUpString;
