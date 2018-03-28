import React from 'react'
import Checkbox from './checkbox'

const CheckPanel = (props) => {
  return (
    <div className="checkPanel">
      <form>
    {
      // check is hdi or pop
      Object.keys(props.checks).map((check, i) => {
        return <Checkbox indexname={check} onClick={props.checks[check].checkPanelClickHandler} key={i} />
      })
    }
    {props.children}
  </form>
    </div>
  )
}

export default CheckPanel
