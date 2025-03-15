import React from 'react'
import { MdDelete } from 'react-icons/md'
import axiosInstance from '../Utils/AxiosInstance'
import { toast } from 'react-toastify'
import Button from './Button'

const DeleteNotes = ({ isOpen, setIsOpen }) => {
    const handleDeleteNote = async (noteId) => {
        try {
            const { data } = await axiosInstance.delete('/api/user/delete-notes/' + noteId)
            if (data.success) {
                setIsOpen({ ...isOpen, type: '', noteId: '' })
                toast.success(data.message)
            } else {
                setIsOpen({ ...isOpen, type: '', noteId: '' })
                toast.error(data.message)
            }
        } catch (error) {
            setIsOpen({ ...isOpen, type: '', noteId: '' })
            toast.error(error.message)
        }
    }

    return (
        <>
            <div onClick={() => setIsOpen({ ...isOpen, type: '', noteId: '' })}
                className='h-screen w-full fixed top-0 left-0 bg-gray-600 opacity-60 z-10' />
            <div className='bg-transparent z-20 min-h-[20%] absolute top-[35%] w-full px-5 py-1
                        flex flex-col justify-center items-center gap-4 rounded overflow-y-scroll noScrollbar'>
                <div className='flex flex-col justify-center items-center gap-4 bg-white rounded-md p-4'>
                    <h1 className='text-xl sm:text-2xl'>Do you want to delete this note?</h1>
                    <div className='bg-slate-300 w-16 h-16 flex justify-center items-center rounded-md cursor-default'>
                        <MdDelete size={50} className='text-red-600' />
                    </div>
                    <div className='flex justify-center items-center gap-4 w-full'>
                        <Button label='Cancel' onClick={() => setIsOpen({ ...isOpen, type: '', noteId: '' })}
                            className='w-full font-semibold border border-fuchsia-600 hover:bg-white hover:text-red-600 hover:border-red-600' />
                        <Button label='Delete' onClick={() => handleDeleteNote(isOpen.noteId)}
                            className='w-full font-semibold border border-fuchsia-600 hover:bg-red-600 hover:border-red-600' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteNotes