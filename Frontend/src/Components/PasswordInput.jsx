import React, { useState } from 'react'
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa"

const PasswordInput = ({ value, onChange, placeholder, required = false }) => {
    const [isShow, setIsShow] = useState(false)

    const toggleShowPassword = () => {
        setIsShow(!isShow)
    }

    return (
        <div className='bg-transparent border-[1.5px] border-slate-600 flex justify-center items-center rounded'>
            <input
                type={isShow ? 'text' : 'password'}
                name='value'
                value={value}
                onChange={onChange}
                autoComplete='off'
                placeholder={placeholder || 'Password'}
                className='px-4 py-2 flex-1 w-full outline-none'
                required={required}
            />
            {isShow ? (
                <FaEye
                    size={20}
                    className='cursor-pointer mr-2'
                    onClick={toggleShowPassword}
                />
            ) : (
                <FaEyeSlash
                    size={20}
                    className='cursor-pointer mr-2'
                    onClick={toggleShowPassword}
                />
            )}
        </div>
    )
}

export default PasswordInput