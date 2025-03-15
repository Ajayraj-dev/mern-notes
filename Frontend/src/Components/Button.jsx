import React from 'react'

const Button = ({ label, onClick, className }) => {
    return (
        <>
            <button
                onClick={onClick}
                className={`${className} px-4 py-2 bg-fuchsia-600 text-white rounded cursor-pointer`}
            >
                {label}
            </button>
        </>
    )
}

export default Button