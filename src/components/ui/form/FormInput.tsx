import React, { useEffect } from 'react'

interface InputProps {
    value: string | number,
    onChange: (value: string) => void
    editable?: boolean
    label: string
}

function FormInput({ value, onChange, editable=true, label }: InputProps) {
    const [val, setVal] = React.useState(value)

    return (
        <div className='flex gap-1 flex-col'>
            <label className='text-xs text-gray-400'>{label}</label>
            <input
                type='text'
                value={value}
                // readOnly={!editable}
                onChange={(e) => onChange(e.target.value)}
                className='outline-none bg-black bg-opacity-40 focus:bg-opacity-60 focus:text-gray-300 duration-150 rounded-md p-2 text-gray-400'
            />
        </div>
    )
}

export default FormInput