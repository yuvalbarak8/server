const mongoose = require('mongoose');
const {ObjectId} = require("mongodb");

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
    friends: {
        type: [{
            id: ObjectId,
            ref: User
        }],
    },
    friends_request: {
        type: [{
            id: ObjectId,
            ref: User
        }]
    }
});

module.exports = mongoose.model('User', User);
