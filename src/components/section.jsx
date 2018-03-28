import React from 'react'

const Section = (props) => {
  return (
    <div className="section">
      <h3 className="section__header">{props.title}</h3>
      <div className="section__content">
        {props.children}
      </div>
    </div>
  )
}

export default Section
