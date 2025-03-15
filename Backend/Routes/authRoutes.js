import express from "express"
import { isAuthenticated, login, logout, register } from "../Controllers/authController.js"
import userAuth from "../Middleware/userAuth.js"

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/isAuthenticated', userAuth, isAuthenticated)

export default authRouter