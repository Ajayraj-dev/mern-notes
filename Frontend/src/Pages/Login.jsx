import React, { useState } from 'react'
import TextInput from '../Components/TextInput'
import PasswordInput from '../Components/PasswordInput'
import Button from '../Components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { ValidateEmail } from '../Helper/ValidateEmail'
import { toast } from 'react-toastify'
import axiosInstance from '../Utils/AxiosInstance.js'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (!ValidateEmail(email)) {
                setError('Please enter a email id')
                return
            } else if (!password) {
                setError('Please enter a password')
                return
            }
            setError('')

            const { data } = await axiosInstance.post('/api/auth/login', { email, password })
            if (data.success) {
                navigate('/home')
                toast.success('User loggedIn!')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen grid grid-cols-1 grid-rows-[auto_1fr] bg-white box-border'>
            <nav className='flex justify-between bg-white items-center gap-6 h-12 px-4 drop-shadow'>
                <h1 className='text-xl font-semibold text-black'>MERN <span className='text-fuchsia-600'>Notes</span></h1>
            </nav>
            <main className='p-4 flex justify-center items-center'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full md:w-[400px] border border-slate-600 px-5 py-7 rounded'>
                    <h1 className='text-2xl text-fuchsia-600 font-semibold'>Login</h1>
                    <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className='text-red-600 text-sm'>{error}</p>}
                    <Button label='Login' className='w-full' />
                    <p>
                        Don't have an account?
                        <Link to='/sign-up' className='text-fuchsia-600 ml-2 cursor-pointer'>Create an account</Link>
                    </p>
                </form>
            </main>
        </div>
    )
}

export default Login