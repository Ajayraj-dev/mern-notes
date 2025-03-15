import React from 'react'
import { IoSearch } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"

const SearchBar = ({ value, onChange, handleSearch, handleClear, className }) => {
    return (
        <div className={`${className} justify-center items-center gap-1 border border-slate-600 px-2 py-1 rounded`}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder='Search notes'
                className='outline-none' />
            {value && (
                <RxCross2 size={20} onClick={handleClear} />
            )}
            <IoSearch size={20} onClick={handleSearch} className='hidden sm:block' />
        </div>
    )
}

export default SearchBar