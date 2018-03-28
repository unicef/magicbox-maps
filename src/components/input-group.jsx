import React from 'react'

const InputGroup = (props) => {
  return (
    <div className="checkboxGroup">
      {
        props.group.map((item, i) => {
          // override default properties with item properties
          let properties = Object.assign({}, props, item)
          let disallowedProperties = ['group', 'label']

          // remove disallowed properties for children
          disallowedProperties.forEach((key) => {
            delete properties[key]
          })

          return (
            <label className="checkboxGroup__element" key={item.name + '-' + i}>
              <input {...properties} />
              {item.label}
            </label>
          )
        })
      }
      {props.children}
    </div>
  )
}

export default InputGroup
