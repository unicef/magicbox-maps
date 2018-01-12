/**
 * selectAdmin
 *
 * @param  {Object} admin admin
 * @return {Object} payload
 */
export const selectAdmin = admin => {
  console.log('You selected admin', admin);
  return {
    type: 'ADMIN_SELECTED',
    payload: admin
  }
}
