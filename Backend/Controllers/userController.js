import notesModel from "../Models/notesModel.js"
import userModel from "../Models/userModel.js"

export const getUser = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findOne({ _id: userId })
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        res.json({ success: true, user })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const getnotes = async (req, res) => {
    try {
        const { userId } = req.body
        const notes = await notesModel.find({ userId }).sort({ isPinned: -1 })
        if (!notes) {
            return res.json({ success: false, message: 'Notes are not found!' })
        }

        res.json({ success: true, data: notes })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const addNotes = async (req, res) => {
    try {
        const { title, content, tags, userId } = req.body
        const user = await userModel.findById(userId)
        if (!title || !content) {
            return res.json({ success: false, message: 'Provide title and content' })
        }

        const note = new notesModel({ title, content, tags, userId: user._id })
        await note.save()

        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const editNotes = async (req, res) => {
    try {
        const { title, content, tags, userId } = req.body
        const { noteId } = req.params
        if (!title || !content || !tags) {
            return res.json({ success: false, message: 'No changes occured' })
        }

        const note = await notesModel.findOne({ _id: noteId, userId })
        if (!note) {
            return res.json({ success: false, message: 'Note is not found' })
        }

        note.title = title
        note.content = content
        note.tags = tags
        await note.save()

        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { userId } = req.body
        const { noteId } = req.params
        const note = await notesModel.findOne({ _id: noteId, userId })
        if (!note) {
            return res.json({ success: false, message: 'Note is not found' })
        }

        await note.deleteOne({ _id: noteId, userId })

        res.json({ success: true, message: 'Note deleted successfully!' })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const updatePinned = async (req, res) => {
    try {
        const { isPinned, userId } = req.body
        const { noteId } = req.params

        const note = await notesModel.findOne({ _id: noteId, userId })
        if (!note) {
            return res.json({ success: false, message: 'Note is not found' })
        }

        note.isPinned = isPinned
        await note.save()

        res.json({ success: true })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
