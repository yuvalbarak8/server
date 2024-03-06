const mongoose = require('mongoose')
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
    comments: [{user: String, body: String}]
})
module.exports = mongoose.model('Post', postSchema)
