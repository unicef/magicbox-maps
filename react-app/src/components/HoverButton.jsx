/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import {
  openDock
} from '../actions/action-open-dock.js'

/* eslint-disable require-jsdoc*/
class HoverButton extends React.Component {
/* eslint-disable require-jsdoc*/
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const style = {
      display: this.props.display || 'none'
    }

    return (
      <div>
        <button
          onMouseOver={this.props.openDock}
          onMouseOut={this.props.openDock}
          className = 'hoverButton'
          style={style}
        >
          Reopen Dock
        </button>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    display: state.hoverButton.display
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    openDock: openDock
  }, dispatch)
}

/* eslint-enablerequire-jsdoc*/

export default connect(mapStateToProps, matchDispatchToProps)(HoverButton);
