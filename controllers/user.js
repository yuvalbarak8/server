const userService = require("../services/user")
const jwt = require('jsonwebtoken')

//post users/:id/posts
async function createUser(req, res) {
    console.log(userService);
    res.json(await userService.createUser(req.body.username, req.body.password, req.body.display, req.body.profile));
}

const deleteUser = async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    const username = jwt.verify(token, process.env.KEY).username
    if (req.params.id === String(await userService.getUserByUsername(username)._id)) {
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
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        console.log("error");
        return res.status(404).json({errors: ['User not found']})
    }
    res.json(user);
}
//post users/:id/friends
const sendFriendRequest = async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    const username = jwt.verify(token, process.env.KEY).username
    const user = await userService.getUserByUsername(username)
    if (!user) {
        console.log("error");
        return res.status(404).json({errors: ['User not found']})
    }
    const request = await userService.makeFriendRequest(user._id, req.params.id);
    res.json(request);
}

//patch users/:id/friends/:fid
async function approveFriend(req, res) {
    const username = jwt.verify(req.headers.authorization.split(' ')[1], process.env.KEY).username
    const user = await userService.getUserByUsername(username)
    if (String(user._id) === req.params.id) {
        const friend = await userService.getUserById(req.params.fid)
        if (!user.friends.includes(req.params.fid))
            return res.json(await userService.approveRequest(user, friend._id))
    }
    return null
}

//get users/:id/friends
const getFriends = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const username = jwt.verify(token, process.env.KEY).username
    let user = await userService.getUserByUsername(username)
    if (user.friends.includes(String(await userService.getUserById(req.params.id)._id)) || String(user._id) === req.params.id) {
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
    const user = await userService.getUserById(req.params.id)
    if (user.friends.includes(friend._id)) {
        await userService.deleteFriend(user._id, friend)
        former = await userService.deleteFriend(friend._id, user)
    } else if (user.friends_request.includes(friend._id)) {
        former = await userService.denyRequest(friend._id, user)
    } else {
        res.status(500).send('An error occurred while deleting friends.');
    }
    res.json(former)
}


module.exports = {
    createUser, deleteUser, getUser, updateUser, getFriends, sendFriendRequest, approveFriend, rejectFriend
}
