/**
 * onEach
 * @param  {type} props description
 * @return {function} function
 */
export function onEachAdminFeature(props) {
  return (feature, layer) => {
    layer.on({
      'click': e => {
        props.selectAdmin(e)
      }
    });
  }
}
