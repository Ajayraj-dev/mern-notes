import { createContext, useEffect, useState } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const navigate = useNavigate()
    const [isLogged, setIsLogged] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [notes, setNotes] = useState(null)

    const getNotes = async () => {
        try {
            const { data } = await axiosInstance.get('/api/user/get-notes')
            if (data.success) {
                setNotes(data.data)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getNotes()
    }, [notes])

    const getUser = async () => {
        try {
            const { data } = await axiosInstance.get('/api/user/get-user')
            if (data.success) {
                setUserInfo(data.user)
            } else {
                navigate('/')
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const values = {
        isLogged, setIsLogged,
        userInfo, notes, setNotes
    }

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )
}