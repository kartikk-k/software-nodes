import React from 'react'


interface InputProps {
    value: string | number,
    type?: string,
    onChange: (value: string) => void
}

function Input({ type, value, onChange }: InputProps) {
    return (
        <input type={type ? type : "text"} value={value} onChange={(e) => onChange(e.target.value)} className='p-2 px-3 w-full text-gray-3 focus:text-white rounded-lg text-sm duration-200 bg-dark-2 outline-none' />
    )
}

export default Input