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
    profileImage:{
        type: String,
    },
});

module.exports = mongoose.model('User', User);
