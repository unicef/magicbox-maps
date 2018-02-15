/**
 * Open Dock
 *
 * @return {Object} payload
 */
export const openDock = () => {
  console.log('You want to open the dock');
  return {
    type: 'OPEN_DOCK',
    payload: false
  }
}
