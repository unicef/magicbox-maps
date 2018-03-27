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
    let hamburgerButton = <a onClick={() => {
          this.setState({display: !this.state.display})
          console.log('display', this.state.display)
        }} className={'controlPanel__header__hamburger' +
          (this.state.display ? '' : ' disabled')
        }>CLICK</a>

    return this.state.display ? (
      <div className="controlPanel">
        <div className="controlPanel__header">
        {/* Unicef logo */}
        {/* hamburger */}
        {hamburgerButton}
        </div>
        <div className="controlPanel__menu">
          {this.props.children}
        </div>
      </div>
    ) : hamburgerButton
  }
}

export default ControlPanel
