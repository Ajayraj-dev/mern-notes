import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../Models/userModel.js'

// user register api
export const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Provide all details' })
    }

    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({ name, email, password: hashedPassword })
        await user.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.json({ success: true })

    } catch (error) {
        return res.json({ success: false, message: error })
    }
}

// user login api
export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ success: false, message: 'Provide all details' })
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.json({ success: true })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// user logout api
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict"
        })

        return res.json({ success: true, message: 'User logged out!' })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}