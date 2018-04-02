import React from 'react'

const Legend = (props) => {
  let steps = props.steps || 10
  let hue   = props.hue || 0
  let saturation = props.saturation || 0

  return (
    <div className="legend">
      <div className="legend__text legend__text--left">{props.leftText}</div>
      <div className="legend__bar">
        {
          Array.from(Array(steps)).map((el, i) => {
            let style = {
              width: `${100/steps}%`,
              backgroundColor: `hsla(${hue}, ${saturation}%, ${(i + 1)*(50/steps) + 50}%)`
            }
            return <div className="legend__bar__element" style={style} key={i}>&nbsp;</div>
          })
        }
      </div>
      <div className="legend__text legend__text--right">{props.rightText}</div>
    </div>
  )
}

export default Legend
