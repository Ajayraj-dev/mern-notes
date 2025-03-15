import React, { useState } from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { IoSearch } from 'react-icons/io5'
import { toast } from 'react-toastify'
import axiosInstance from '../Utils/AxiosInstance'

const Navbar = ({ searchQuery, setSearchQuery }) => {
    const [isShow, setIsShow] = useState('')
    const navigate = useNavigate()

    const onLogout = async () => {
        try {
            const { data } = await axiosInstance.post('/api/auth/logout')
            if (data.success) {
                navigate('/')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <nav className='relative flex justify-between bg-white items-center gap-6 h-12 px-4 drop-shadow'>
            <h1 className='text-xl font-semibold text-black'>MERN <span className='text-fuchsia-600'>Notes</span></h1>
            <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                handleClear={() => setSearchQuery('')}
                className='hidden sm:flex' />
            <IoSearch size={20} className='sm:hidden' onClick={() => setIsShow(curr => !curr)} />
            {isShow && (
                <div className='sm:hidden absolute top-12 left-[10%] max-w-[80%]'>
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        handleClear={() => setSearchQuery('')}
                        className='flex bg-white' />
                </div>
            )}
            <ProfileInfo onLogout={onLogout} />
        </nav>
    )
}

export default Navbar