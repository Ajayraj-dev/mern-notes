import React from 'react'
import { BsFillPinFill } from "react-icons/bs"
import { BsPin } from "react-icons/bs"
import { MdEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md"
import moment from 'moment'

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
}) => {
    return (
        <div className='p-4 flex flex-col justify-center gap-2 border border-slate-600 bg-white text-slate-800 
            hover:shadow-md shadow-slate-400 rounded cursor-default transition-all'>
            <div className='flex justify-between items-start gap-4'>
                <div>
                    <h1 className='text-lg text-fuchsia-600 font-semibold'>{title.slice(0, 40)}</h1>
                    <span>{moment(date).format("Do MMM YYYY")}</span>
                </div>
                {isPinned ? (
                    <BsFillPinFill size={20} onClick={onPinNote} className='cursor-pointer' />
                ) : (
                    <BsPin size={20} onClick={onPinNote} className='cursor-pointer' />
                )}
            </div>
            <p className='text-lg font-semibold'>{content?.slice(0, 60)}...</p>
            <div className='flex justify-between items-center gap-4'>
                <p className='flex flex-wrap items-center gap-2'>
                    {tags.map((tag, index) => (
                        <span key={index}>#{tag}</span>
                    ))}
                </p>
                <div className='flex justify-center items-center gap-3'>
                    <MdEdit size={20} onClick={onEdit} className='hover:text-blue-600 cursor-pointer' />
                    <MdDelete size={20} onClick={onDelete} className='hover:text-red-600 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default NoteCard