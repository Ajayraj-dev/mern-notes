import React, { useContext } from 'react'
import { GetInitial } from '../Helper/GetInitial'
import Button from './Button'
import { AppContext } from '../Context/AppContext'

const ProfileInfo = ({ onLogout }) => {
    const { userInfo } = useContext(AppContext)

    return (
        <div className='flex justify-center items-center gap-2'>
            <div className='relative w-10 h-10 flex justify-center items-center bg-slate-300 text-lg text-fuchsia-800 font-semibold rounded cursor-pointer group'>
                {GetInitial(userInfo?.name)}
                <p className='hidden absolute top-14 left-0 bg-slate-300 px-2 py-1 w-[130px] rounded-b rounded-tr group-hover:block transition-all'>{userInfo?.name}</p>
            </div>
            <Button label='Logout' onClick={onLogout} />
        </div>
    )
}

export default ProfileInfo