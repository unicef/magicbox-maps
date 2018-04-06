import React, {Component, Fragment} from 'react'

/**
 * Simple wrapper to map functions
 * keeps the responsability of displaying and hiding itself
 */
class ControlPanel extends Component {
  render() {
    return (
      <Fragment>
        <a onClick={(e) => {
          this.ControlPanel.classList.remove('controlPanel--hide')
        }} className="controlPanel__header__toggleButton controlPanel__header__toggleButton--closed">
          <i className="fas fa-bars" />
        </a>
        <div className="controlPanel" ref={(el) => this.ControlPanel = el}>
          <div className="controlPanel__header">
            <a href="https://www.unicef.org" target="_blank" rel="noopener noreferrer" alt="Unicef" className="controlPanel__header__logo">UNICEF</a>
            <a onClick={(e) => {
              this.ControlPanel.classList.add('controlPanel--hide')
            }} className="controlPanel__header__toggleButton">
              <i className="fas fa-bars" />
            </a>
          </div>
          <div className="controlPanel__menu">
            {this.props.children}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ControlPanel
