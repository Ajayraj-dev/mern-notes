import React, { useState } from 'react'
import TextInput from './TextInput'
import TextArea from './TextArea'
import Button from './Button'
import TagInput from './TagInput'
import { FcCancel } from 'react-icons/fc'
import { toast } from 'react-toastify'
import axiosInstance from '../Utils/AxiosInstance'

const AddNotes = ({ setIsOpen }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState([])
    const [error, setError] = useState('')

    const handleAddNotes = async () => {
        try {
            if (!title) {
                setError('Please enter a title')
                return
            } else if (!content) {
                setError('Please enter a content')
                return
            } else if (!tags) {
                setError('Please enter a tag')
                return
            }
            const { data } = await axiosInstance.post('/api/user/add-notes', { title, content, tags })
            if (data.success) {
                setIsOpen(false)
                toast.success('Note added successfully!')
            } else {
                setIsOpen(false)
                toast.error(data.message)
            }
        } catch (error) {
            setIsOpen(false)
            toast.error(error.message)
        }
    }

    return (
        <>
            <div onClick={() => { !title && !content && setIsOpen(false) }}
                className='h-screen w-full fixed top-0 left-0 bg-gray-600 opacity-60 z-10' />
            <div className='p-4 bg-white z-20 h-[82%] absolute top-10 left-[5%] md:left-[20%] w-[90%] md:w-[60%] 
                        flex flex-col gap-2 rounded overflow-y-scroll noScrollbar'>
                <label className='flex justify-between items-center gap-4'>
                    TITLE
                    <FcCancel size={20} className='cursor-pointer' onClick={() => setIsOpen(false)} />
                </label>
                <TextInput
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Title'
                />
                <label>CONTENT</label>
                <TextArea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className='flex flex-col justify-center gap-2'>
                    <label>TAGS</label>
                    <TagInput
                        tags={tags}
                        setTags={setTags}
                    />
                </div>
                {error && (
                    <p className='text-red-600'>{error}</p>
                )}
                <Button label='Add' className='w-full mt-4' onClick={handleAddNotes} />
            </div>
        </>
    )
}

export default AddNotes