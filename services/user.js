const User = require('../models/user');
const mongoose = require("mongoose");

const createUser = async (username, password, token) => {
    const user = new User({ username: username, password: password, token : token,
    friends : ["test", "wow"]});
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
const getUserByToken = async (token) =>{
    const user = await User.findOne({token : token });
    if(!user)
    {
        return null;
    }
    return user;
}
const getAllFriends = async (id, token) => {
    try {
        const user = await User.findById(id);

        if (!user || user.token !== token) {
            // User not found
            return null;
        }
        console.log(user.friends);

        // User found, return the friends list
        return user.friends;
    } catch (error) {
        // Handle database query error
        console.error('Error while fetching user:', error);
        return null;
    }
};
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

const makeFriendRequest = async (theUser, friend) => {
    const friend_user = await getUserById(friend);
    if (!friend_user) {
        console.log("friend user not found");
        return null;
    }

    try {
        const result = await friend_user.updateOne(
            { $push: { friends_request: theUser } }
        );
    } catch (error) {
        console.error("Error updating friend request:", error);
        return null; // Return null or an appropriate value indicating failure
    }
};


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

module.exports = { createUser, deleteUser, getAllFriends, getUserById, makeFriendRequest, updateUser,
    login, getUserByToken};
