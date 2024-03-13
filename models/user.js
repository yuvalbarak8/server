const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    displayName: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    token: {
        type: String,
    },
    friends: [String],
    friends_request: [String]
});

module.exports = mongoose.model('User', User);
