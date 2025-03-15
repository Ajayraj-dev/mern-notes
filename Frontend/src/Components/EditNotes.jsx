import React, { useContext, useState } from 'react'
import TextInput from './TextInput'
import TextArea from './TextArea'
import Button from './Button'
import TagInput from './TagInput'
import { FcCancel } from 'react-icons/fc'
import { toast } from 'react-toastify'
import axiosInstance from '../Utils/AxiosInstance'

const EditNotes = ({ isOpen, setIsOpen, note, setNote }) => {
    const [title, setTitle] = useState(note?.title || '')
    const [content, setContent] = useState(note?.content || '')
    const [tags, setTags] = useState(note?.tags || [])
    const [error, setError] = useState('')

    const handleEditNotes = async () => {
        try {
            if (title !== note?.title || content !== note?.content || tags !== note?.tags) {
                const { data } = await axiosInstance.put(`/api/user/edit-notes/${note._id}`, { title, content, tags })
                if (data.success) {
                    setNote({})
                    setIsOpen({ ...isOpen, type: '', noteId: '' })
                    toast.success('Note edited succesfully!')
                } else {
                    setNote({})
                    setIsOpen({ ...isOpen, type: '', noteId: '' })
                    toast.error(data.message)
                }
            } else {
                setError('No chnages occured')
            }
        } catch (error) {
            setNote({})
            setIsOpen({ ...isOpen, type: '', noteId: '' })
            toast.error(error.message)
        }
    }

    const handleClose = () => {
        setNote({})
        setIsOpen({ ...isOpen, type: '', noteId: '' })
    }

    return (
        <>
            <div className='h-screen w-full fixed top-0 left-0 bg-gray-600 opacity-60 z-10' />
            <div className='p-4 bg-white z-20 h-[82%] absolute top-10 left-[5%] md:left-[20%] w-[90%] md:w-[60%] 
                        flex flex-col gap-2 rounded overflow-y-scroll noScrollbar'>
                <label className='flex justify-between items-center gap-4'>
                    TITLE
                    <FcCancel size={20} className='cursor-pointer' onClick={handleClose} />
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
                <Button label='Add' className='w-full mt-4' onClick={() => handleEditNotes()} />
            </div>
        </>
    )
}

export default EditNotes