import mongoose from "mongoose"

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('Database connected')
    })
    // mongoose connection with mongodb database
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-notes`)
}

export default connectDB