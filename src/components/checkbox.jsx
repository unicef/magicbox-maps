import React from 'react'

const Checkbox = (props) => {
  console.log(props, 'ppp')
  return (
    <div>
      <input className="controlButton" id="xxx" name='xxx' value={props.nombre} type="radio" {...props}/>
      <label>{props.nombre}</label>
    </div>
  )
}

export default Checkbox
