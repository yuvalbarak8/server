const mongoose = require('mongoose');
const url = require("url");

//username, password, nickname, profileimage

const Schema = mongoose.Schema;
const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // ,
    // displayname: {
    //     type: String,
    //     required: true
    // },
    // profileimage:{
    //     type: url,
    //     require: false
    // }
});

module.exports = mongoose.model('User', User);
