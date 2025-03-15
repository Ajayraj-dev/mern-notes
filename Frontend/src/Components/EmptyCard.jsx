import React from 'react'
import notes from '../assets/pinNote.png'

const EmptyCard = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <img src={notes} alt="pinNote image" className='w-60 sm:w-80' />
            <h1 className='text-xl font-semibold text-center w-80 sm:w-8/12'>Start creating your 1st note! Click the 'ADD' button to write down your thoughts, ideas and remainders. Let's get started!</h1>
        </div>
    )
}

export default EmptyCard