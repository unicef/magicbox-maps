import React from 'react'

const CheckboxGroup = (props) => {
  return (
    <div className="checkboxGroup">
      {
        props.group.map((item, i) => {
          return (
            <label className="checkboxGroup__element" key={item.name + '-' + i}>
              <input type="checkbox" name={item.name || props.name} value={item.value} onChange={item.onChange || props.onChange} />
              {item.label}
            </label>
          )
        })
      }
      {props.children}
    </div>
  )
}

export default CheckboxGroup
