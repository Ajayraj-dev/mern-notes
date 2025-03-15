import React, { useState } from 'react'
import TextInput from './TextInput'
import { IoIosAdd } from 'react-icons/io'
import { FcCancel } from "react-icons/fc"

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('')

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewTags()
        }
    }

    const addNewTags = () => {
        const value = inputValue.trim().toLowerCase()
        if (!value || value !== '') {
            setTags([...tags, value])
            setInputValue('')
        }
    }

    const handleRemove = (tagName) => {
        setTags(tags.filter((tag) => tag !== tagName))
    }

    return (
        <div>
            {tags?.length > 0 && (
                <div className='flex items-center flex-wrap gap-2 mb-3 cursor-default'>
                    {tags.map((tag, index) => (
                        <span key={index} className='flex justify-between items-center gap-2 p-1 bg-slate-300 rounded'>
                            # {tag}
                            <FcCancel size={20} className='cursor-pointer' onClick={() => handleRemove(tag)} />
                        </span>
                    ))}
                </div>
            )}
            <div className='w-60 flex justify-center items-center gap-2'>
                <TextInput
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Tags'
                />
                <IoIosAdd size={35} onClick={addNewTags}
                    className='w-12 h-9 text-fuchsia-600 hover:bg-fuchsia-600 hover:text-white rounded cursor-pointer transition-all' />
            </div>
        </div>
    )
}

export default TagInput