import React, { useContext, useState } from 'react'
import Navbar from '../Components/Navbar'
import NoteCard from '../Components/NoteCard'
import { IoIosAdd } from "react-icons/io"
import AddNotes from '../Components/AddNotes'
import EditNotes from '../Components/EditNotes'
import { AppContext } from '../Context/AppContext'
import DeleteNotes from '../Components/DeleteNotes'
import PinNotes from '../Components/PinNotes'
import EmptyCard from '../Components/EmptyCard'

const Home = () => {
    const { notes } = useContext(AppContext)
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [isOpen, setIsOpen] = useState({ type: '', noteId: '' })
    const [note, setNote] = useState({})
    const [searchQuery, setSearchQuery] = useState('')

    const handleEditNotes = (noteId) => {
        setNote(notes[noteId])
        setIsOpen({ ...isOpen, type: 'Edit', noteId })
    }

    const handleDeleteOpen = (noteId) => {
        setIsOpen({ ...isOpen, type: 'Delete', noteId: notes[noteId]._id })
    }

    const handlePinOpen = (noteId) => {
        setNote(notes[noteId])
        setIsOpen({ ...isOpen, type: 'Pin', noteId })
    }

    const filteredNotes = notes?.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className='relative min-h-screen grid grid-cols-1 grid-rows-[auto_1fr] bg-white box-border'>
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <main className='px-4 py-6 bg-white'>
                {filteredNotes?.length > 0 ? (
                    <div className='xl:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {filteredNotes?.map((note, index) => (
                            <NoteCard
                                key={note._id}
                                title={note.title}
                                date={note.createAt}
                                content={note.content}
                                tags={note.tags}
                                isPinned={note.isPinned}
                                onEdit={() => handleEditNotes(index)}
                                onDelete={() => handleDeleteOpen(index)}
                                onPinNote={() => handlePinOpen(index)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyCard />
                )}
            </main>
            <IoIosAdd size={35} onClick={() => setIsOpenAdd(true)}
                className='fixed bottom-10 right-10 flex justify-center items-center bg-fuchsia-600 text-white w-10 h-10 rounded-full cursor-pointer' />
            {isOpenAdd && (
                <AddNotes setIsOpen={setIsOpenAdd} />
            )}
            {isOpen.type === 'Edit' && (
                <EditNotes
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    note={note}
                    setNote={setNote}
                />
            )}
            {isOpen.type === 'Delete' && (
                <DeleteNotes isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
            {isOpen.type === 'Pin' && (
                <PinNotes
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    note={note}
                    setNote={setNote}
                />
            )}
        </div>
    )
}

export default Home