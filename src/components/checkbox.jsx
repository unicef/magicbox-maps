import React from 'react'

const Checkbox = (props) => {
  return (
    <div>
      <input className="controlButton" name='aaa' value={props.indexname} type="radio" {...props}/>
      <label>{props.indexname}</label>
    </div>
  )
}

export default Checkbox
