import React, {Component} from 'react'

/**
 * Simple wrapper to map functions
 * keeps the responsability of displaying and hiding itself
 */
class ControlPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      display: true
    }
  }

  render() {
    let toggleButtonClasses = ['controlPanel__header__toggleButton controlPanel__header__toggleButton']

    // Add disabled class to toggle button
    // if panel is not being displayed
    if (!this.state.display) {
      toggleButtonClasses.push('controlPanel__header__toggleButton--disabled')
    }

    let toggleButton = <a onClick={() => {
          this.setState({display: !this.state.display})
        }} className={toggleButtonClasses.join(' ')}><i className="fas fa-bars"></i></a>

    return this.state.display ? (
      <div className="controlPanel">
        <div className="controlPanel__header">
        {/* Unicef logo */}
        {/* toggle button */}
        {toggleButton}
        </div>
        <div className="controlPanel__menu">
          {this.props.children}
        </div>
      </div>
    ) : toggleButton
  }
}

export default ControlPanel
