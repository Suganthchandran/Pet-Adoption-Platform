import React from 'react'
import '../styles/Button.css'

const Button = ({name}) => {
  return (
    <div className='component-button-container'>
      <button className='component-button'>{name}</button>
    </div>
  )
}

export default Button
