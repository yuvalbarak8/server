const mongoose = require('mongoose')
const {ObjectId} = require("mongodb");
const Schema = mongoose.Schema
const postSchema = new Schema ({
    username: {
        String,
    },
    text:{
        String,
    },
    img:{
        String,
    },
    profilePic:{
        String,
    },
    comments: [{user: {type: Schema.Types.ObjectId, ref: 'User'}}],
    likes: [{user: {
        type: Schema.Types.ObjectId,
            ref: 'User'
        }}]
})
module.exports = mongoose.model('Post', postSchema)
