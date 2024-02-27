const mongoose = require(   'mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } // In a real app, hash passwords before storing them!
});

module.exports = mongoose.model('User', userSchema);
