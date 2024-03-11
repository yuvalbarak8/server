const User = require('../models/user');

async function createUser(username, password, display, profile, token){
    const user = new User({
        username: username,
        password: password,
        displayName: display,
        profileImage: profile,
        token: token,
        friends: [],
        friends_request: []
    });
    return await user.save();
};

async function getUserById(id){
    const user = await User.findById(id);
    if (!user) return null;
    return user;
}

async function getUserByToken(token) {
    const user = await User.findOne({token: token});
    if (!user) return null;
    return user;
}

async function getAllFriends(id, token) {
    try {
        const user = await User.findById(id);

        if (!user || user !== token) {
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
function deleteUser(id) {
    return User.findOneAndDelete({_id: id});
}
function updateUser(id, displayName, profile){
    return  User.findOneAndUpdate(id, {displayName: displayName, profileImage: profile});
}

async function makeFriendRequest(theUser, friend){
    const friend_user = await getUserById(friend);
    if (!friend_user) {
        console.log("friend user not found");
        return null;
    }
    if (theUser.friends_request.includes(friend_user)) {
        try {
            const result = await friend_user.updateOne(
                {$push: {friends_request: theUser}}
            )
        } catch (error) {
            console.error("Error updating friend request:", error);
            return null; // Return null or an appropriate value indicating failure
        }
    }
};


async function login(username, password){
    const user = await User.findOne({username: username, passsword: password});

    if (!user) {
        console.log("not found");
        return null;
    }

    const userToken = user.token;
    console.log("Good login");
    return userToken;
};

module.exports = {
    createUser, deleteUser, getAllFriends, getUserById, makeFriendRequest, updateUser,
    login, getUserByToken
};
