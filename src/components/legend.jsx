import React from 'react'
import ColorConvert from 'color-convert'

/**
 * Performs a simple linear regression to get middle values of a given interval
 *
 * initialValue   -> Number, any range
 * finalValue     -> Number, any range
 * numberOfPoints -> Integer, [1, +Infinity]
 * currentPoint   -> Integer, [0, numberOfPoints - 1]
 *
 * returns the integer value of the regression as a string
 */
const linearRegression = (initialValue, finalValue, numberOfPoints, currentPoint) => {
  return (initialValue + (finalValue - initialValue)*(currentPoint + 1)/numberOfPoints).toFixed(0)
}

/**
 * Legend component
 */
const Legend = (props) => {
  let steps        = props.steps || 10
  let initialColor = ColorConvert.hex.rgb(props.from || '000')
  let finalColor   = ColorConvert.hex.rgb(props.to   || 'FFF')

  return (
    <div className="legend">
      <div className="legend__text legend__text--left">{props.leftText}</div>
      <div className="legend__bar">
        {
          Array.from(Array(steps)).map((el, i) => {
            let currentColor = ['red', 'green', 'blue'].map((el, colorIndex) => {
              return linearRegression(initialColor[colorIndex], finalColor[colorIndex], steps, i)
            })

            let style = {
              width: `${100/steps}%`,
              backgroundColor: `rgb(${currentColor.join(',')})`
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
