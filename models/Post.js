const { Schema, model } = require('mongoose')

const Post = new Schema ({
    postAuthor: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    filename: {
        type: String
    }
})

module.exports = model('Post', Post)