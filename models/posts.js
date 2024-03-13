const mongoose = require('mongoose')
const {ObjectId} = require("mongodb");
const Schema = mongoose.Schema
const postSchema = new Schema ({
    username: {
        type: String,
    },
    text: {
        type: String,
    },
    img: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    publishDate: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

module.exports = mongoose.model('Post', postSchema)
