import React from 'react'
import Checkbox from './checkbox'

const CheckPanel = (props) => {
  return (
    <div className="checkPanel">
      <form>
    {
      Object.keys(props.checks).map((check, i) => {
        return <Checkbox nombre={check} onClick={props.checks[check].checkPanelClickHandler} key={i} />
      })
    }
    {props.children}
  </form>
    </div>
  )
}

export default CheckPanel
