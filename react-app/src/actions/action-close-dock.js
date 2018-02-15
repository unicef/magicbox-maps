/**
 * toggleDock
 *
 * @param  {Object} toggle_state admin
 * @return {Object} payload
 */
export const closeDock = () => {
  console.log('You closed dock');
  return {
    type: 'DOCK_CLOSED',
    payload: true
  }
}
