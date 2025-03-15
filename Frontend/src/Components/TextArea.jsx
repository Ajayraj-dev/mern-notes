import React from 'react'

const TextArea = ({ value, onChange, placeholder, required = false }) => {
    return (
        <textarea
            type='text'
            rows={10}
            value={value}
            onChange={onChange}
            placeholder={placeholder || 'Textarea'}
            className='bg-transparent border-[1.5px] border-slate-600 px-4 py-2 rounded w-full outline-none'
            required={required}
        />
    )
}

export default TextArea