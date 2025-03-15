import express from "express"
import { addNotes, deleteNote, editNotes, getnotes, getUser, updatePinned } from "../Controllers/userController.js"
import userAuth from "../Middleware/userAuth.js"

const userRouter = express.Router()

userRouter.get('/get-user', userAuth, getUser)
userRouter.get('/get-notes', userAuth, getnotes)
userRouter.post('/add-notes', userAuth, addNotes)
userRouter.put('/edit-notes/:noteId', userAuth, editNotes)
userRouter.put('/update-pin/:noteId', userAuth, updatePinned)
userRouter.delete('/delete-notes/:noteId', userAuth, deleteNote)

export default userRouter