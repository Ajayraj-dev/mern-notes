import React from 'react'
import { BsFillPinFill, BsPin } from 'react-icons/bs'
import Button from './Button'
import { toast } from 'react-toastify'
import axiosInstance from '../Utils/AxiosInstance'

const PinNotes = ({ isOpen, setIsOpen, note, setNote }) => {
    const handlePinNotes = async () => {
        try {
            const isPinned = !note.isPinned
            const { data } = await axiosInstance.put('/api/user/update-pin/' + note._id, { isPinned })
            if (data.success) {
                setNote({})
                setIsOpen({ ...isOpen, type: '', noteId: '' })
            } else {
                setNote({})
                setIsOpen({ ...isOpen, type: '', noteId: '' })
                toast.error(data.message)
            }
        } catch (error) {
            setNote({})
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
                    <h1 className='text-xl sm:text-2xl'>{note.isPinned ? 'Do you want to unpin this note?' : 'Do you want to pin this note?'}</h1>
                    <div className='bg-slate-300 w-16 h-16 flex justify-center items-center rounded-md cursor-default'>
                        {note.isPinned ? (
                            <BsPin size={50} className='text-blue-600' />
                        ) : (
                            <BsFillPinFill size={50} className='text-blue-600' />
                        )}
                    </div>
                    <div className='flex justify-center items-center gap-4 w-full'>
                        <Button label='Cancel' onClick={() => setIsOpen({ ...isOpen, type: '', noteId: '' })}
                            className='w-full font-semibold border border-fuchsia-600 hover:bg-white hover:text-blue-600 hover:border-blue-600' />
                        <Button label={note.isPinned ? 'Unpinned' : 'Pinned'} onClick={() => handlePinNotes()}
                            className='w-full font-semibold border border-fuchsia-600 hover:bg-blue-600 hover:border-blue-600' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PinNotes