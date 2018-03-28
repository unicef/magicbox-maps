import React from 'react'
import Button from './button'

const ControlPanel = (props) => {
  return (
    <div className="controlPanel">
    {
      Object.keys(props.check).map((control, i) => {
        return <Button name={control} onClick={props.controls[control]} key={i} />
      })
    }
    {props.children}
    </div>
  )
}

export default ControlPanel
