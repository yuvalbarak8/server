const userService = require("../services/user")
const jwt = require('jsonwebtoken')
const {getUserById} = require("../services/user");


//post users/:id/posts
async function createUser(req, res) {
    console.log(userService);
    res.json(await userService.createUser(req.body.username, req.body.password, req.body.display, req.body.profile));
}

const deleteUser = async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    if (req.params.id === jwt.verify(token, process.env.KEY)._id) {
        const user = await userService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({errors: ['User not found']})
        }
        res.json(user);
    }
}

//patch users/:id
const updateUser = async (req, res) => {
    const user = await userService.getUserById(req.params._id)
    const displayName = (req.body.display !== "") ? req.body.display : user.displayName
    const profile = (req.body.profile !== "") ? req.body.profile : user.profileImage
    const newUser = await userService.updateUser(req.params._id, displayName, profile);
    console.log(newUser);
    if (newUser) {
        return res.status(404).json({errors: ['User not found']})
    }
    res.json(user);
}
//get users/:id
const getUser = async (req, res) => {
    const user = await userService.getUserById(req.params._id);
    if (!user) {
        console.log("error");
        return res.status(404).json({errors: ['User not found']})
    }
    res.json(user);
}
//post users/:id/friends
const sendFriendRequest = async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    const user = jwt.verify(token, process.env.KEY)
    if (!user) {
        console.log("error");
        return res.status(404).json({errors: ['User not found']})
    }
    const request = await userService.makeFriendRequest(user, req.params.id);
    res.json(request);
}

//patch users/:id/friends/:fid
async function approveFriend(req, res) {
    const user = jwt.verify(req.headers.authorization.split(' ')[1], process.env.KEY)
    if (user._id === req.params.id) {
        const friend = await userService.getUserById(req.params.fid)
        return res.json(await userService.approveRequest(user, friend.displayName))
    }
    return null
}

//get users/:id/friends
const getFriends = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    let user = jwt.verify(token, process.env.KEY)
    if (req.params.id === user._id) {
        try {
            const friendsList = userService.getAllFriends(user);
            console.log('Friends list:', friendsList);
            res.json(friendsList)
        } catch (error) {
            console.error('Error fetching friends:', error);
            res.status(500).send('An error occurred while fetching friends.');
        }
    }
    if (user.friends.includes(await getUserById(req.params.id).displayName)) {
        try {
            user = await userService.getUserById(req.params.id)
            const friends = userService.getAllFriends(user)
            res.json(friends)
        } catch (error) {
            console.error('Error fetching friends:', error);
            res.status(500).send('An error occurred while fetching friends.');
        }
    }
}

//delete users/:id/friends/:fid
async function rejectFriend(req, res) {
    let former
    const friend = await userService.getUserById(req.params.fid)
    const user = await userService.getUserById(req.headers.authorization.split(' ')[1])
    if (user._id === req.params.id) {
        if (user.friends.includes(friend.displayName)) {
            await userService.deleteFriend(user.displayName, friend)
            former = await userService.deleteFriend(friend.displayName, user)
        } else if (user.friends_request.includes(friend.displayName)) {
            former = await userService.denyRequest(friend.displayName, user)
        } else {
            res.status(500).send('An error occurred while deleting friends.');
        }
    }
    res.json(former)
}

const checkLogin = async (req, res) => {
    console.log("get login request");
    const user = await userService.login(req.body.username, req.body.password);
    if (!user) {
        res.json(0);
        return;
    }
    req.session.token = user.token;
    console.log("token is: " + req.session.token);
    console.log(user);
    user.profileImage = null;
    res.json(user);

}

module.exports = {
    createUser,
    checkLogin,
    deleteUser,
    getUser,
    updateUser,
    getFriends,
    sendFriendRequest,
    approveFriend,
    rejectFriend
}
