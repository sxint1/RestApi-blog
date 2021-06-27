require('dotenv').config
const authRouter = require('./routes/authRoutes')
const postRouter = require('./routes/postRoutes')
const admRouter = require('./routes/admRoutes')
const comRouter = require('./routes/comRoutes')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/admin', admRouter)
app.use('/comments', comRouter)

const PORT = process.env.PORT || 7000

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.j7v0l.mongodb.net/blog?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        app.listen(PORT, () => console.log(`Server has been started on ${PORT}....`))
    } catch (e) {
        console.log(e)
    }
}

start()