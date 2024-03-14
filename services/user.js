const User = require('../models/user');
const jwt = require('jsonwebtoken')
const {env} = require("custom-env");


async function createUser(username, password, display, profile) {
    const user = new User({
        username: username,
        password: password,
        displayName: display,
        profileImage: profile,
        friends: [],
        friends_request: []
    });
   user.token = jwt.sign({user}, process.env.KEY);
    return await user.save();
}

async function getUserById(id) {
    const user = await User.findById(id);
    if (!user) return null;
    return user;
}


function getAllFriends(user) {
    return user.friends
}

const getUserByUsername = async(username) =>{
    const user = await User.findOne({displayName: username});
    if(!user){
        return null;
    }
    return user;

}

async function deleteUser(id) {
    return User.findOneAndDelete(id)
}

function updateUser(id, displayName, profile) {
    return User.findOneAndUpdate(id, {displayName: displayName, profileImage: profile});
}
async function approveRequest(user, friendId) {
    const friend = await User.findById(friendId)
    await user.friends_request.findOneAndDelete(friend.displayName)
    user.friends.push(friendName)
    friend.friends.push(user.displayName)
    await friend.save()
    return await user.save()
}

async function makeFriendRequest(user, friend) {
    const friend_user = await getUserById(friend);
    if (!friend_user) {
        console.log("user not found");
        return null;
    }
    if (!friend_user.friends_request.includes(user.displayName)) {
        try {
            const result = await friend_user.updateOne(
                {$push: {friends_request: user.displayName}}
            )
        } catch (error) {
            console.error("Error updating friend request:", error);
            return null; // Return null or an appropriate value indicating failure
        }
    }
}
async function deleteFriend(friend, user) {
    const index = user.friends_request.indexOf(friend)
    user.friends.splice(index, 1)
    return user.save()
}
async function denyRequest(friendRequest, user) {
    const index = user.friends_request.indexOf(friendRequest)
    user.friends_request.splice(index, 1)
    return user.save()
}



module.exports = {
    createUser, deleteUser,getUserByUsername, getAllFriends, getUserById, makeFriendRequest, updateUser, approveRequest, deleteFriend, denyRequest}



