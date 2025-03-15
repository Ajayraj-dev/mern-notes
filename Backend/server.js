import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config.js'
import connectDB from './Config/mongodb.js'
import authRouter from './Routes/authRoutes.js'
import userRouter from './Routes/userRoutes.js'

const app = express()
const port = process.env.PORT

connectDB()

const allowedOrigins = process.env.FRONTEND_URL

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))


app.get('/', (req, res) => {
    res.send('Api is working fine  ...')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port : ${port}`)
})