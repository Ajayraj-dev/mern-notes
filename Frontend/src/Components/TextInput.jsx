import React from 'react'

const TextInput = ({ value, onChange, onKeyDown, placeholder, required = false }) => {
    return (
        <>
            <input
                type='text'
                name='value'
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoComplete='off'
                placeholder={placeholder || 'Email'}
                className='bg-transparent border-[1.5px] border-slate-600 px-4 py-2 rounded w-full outline-none'
                required={required}
            />
        </>
    )
}

export default TextInput