const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema ({
    username: {
        String,
        required: true
    },
    text:{
        String,
        required: true
    },
    img:{
        String,
        required: true
    },
    profilePic:{
        String,
        required: true
    },
    comments: [{user: String, body: String}]
})
module.exports = mongoose.model('Post', postSchema)
