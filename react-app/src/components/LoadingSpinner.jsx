import {Component} from 'react';
import {RotateLoader} from 'halogenium';

/**
 * Loading Spinner component
 */
class LoadingSpinner extends Component {
  /**
   * Render Loading Spinner component
   *
   * @return {component}
   */
  render() {
    const style = {
      position: 'absolute',
      margin: 'auto',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: '100px',
      height: '100px'
    }

    if (this.props.display) {
      return (
        <div style ={style}>
          <RotateLoader color="#FFFFFF" size="16px" margin="4px"/>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default LoadingSpinner;
