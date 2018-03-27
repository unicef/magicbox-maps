import React from 'react'

const Button = (props) => {
  return (
    <a className="controlButton" {...props}>
      {props.name}
    </a>
  )
}

export default Button
