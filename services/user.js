const User = require('../models/user');
const mongoose = require("mongoose");

const createUser = async (username, password) => {
    const user = new User({ username: username, password: password });
    return await user.save();
};

const getUserById = async (id) =>{
    const user = await User.findById(id);
    if(!user)
    {
        return null;
    }
    return user;
}
const deleteUser = async (id) =>{
const user = await getUserById(id);
if(!user) return null;
await user.deleteOne();
return user;
}

module.exports = { createUser: createUser, deleteUser : deleteUser, getUserById : getUserById };
