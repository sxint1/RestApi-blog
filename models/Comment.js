const { Schema, model } = require('mongoose')
const { User } = require('./User')
const { Post } = require('./Post')

const Comment = new Schema({
    commAuthorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }]
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = model('Comment', Comment)