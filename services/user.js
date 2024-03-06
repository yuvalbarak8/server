const User = require('../models/user');
const mongoose = require("mongoose");

const createUser = async (username, password, token) => {
    const user = new User({ username: username, password: password, token : token});
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
const updateUser = async (id, username, password) =>{
    const user = await getUserById(id);
    if(!user) return null;
    await user.updateOne({username: username, password : password});
    return user;
}
const login = async (username, password) => {
    const users = await User.find({ username, password });

    if (users.length === 0) {
        console.log("Bad login");
        return null;
    }

    const user = users[0];
    const userToken = user.token;
    console.log("Good login");
    return userToken;
};

module.exports = { createUser: createUser, deleteUser : deleteUser,
    getUserById: getUserById, updateUser: updateUser, login : login };
