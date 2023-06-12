import React from 'react'

interface LabelProps {
    text: string
}

function Label({text}: LabelProps) {
  return (
    <label htmlFor="" className='text-xs block text-gray-3'>{text}</label>
  )
}

export default Label