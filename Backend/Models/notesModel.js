import mongoose from "mongoose"

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: { type: String, required: true },
    createAt: { type: Date, default: new Date().getTime() }
})

const notesModel = mongoose.models.note || mongoose.model('note', notesSchema)

export default notesModel