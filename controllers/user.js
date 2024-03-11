const userService = require('../services/user');
const posts = require("../services/posts");
const {getUserById} = require("../services/user");

const createUser = async (req, res) => {
    res.json(await userService.createUser(req.body.username,req.body.password, req.body.token));
};
const deleteUser = async (req, res)=>{
    const user = await userService.deleteUser(req.params.id);
    if(!user){
        return res.status(404).json({errors: ['User not found']})
    }
    res.json(user);
}
const updateUser = async (req, res)=>{
    const user = await userService.updateUser(req.body.id, req.body.username, req.body.password);
    console.log(user);
    if(!user){
        return res.status(404).json({errors: ['User not found']})
    }
    res.json(user);
}
const getUser = async (req, res) =>
{
    const user = await userService.getUserById(req.params.id);
    if(!user){
        console.log("error");
        return res.status(404).json({errors : ['User not found']})
    }
    res.json(user);
}
const getUserFromToken = async (req, res) =>
{
    const user = await userService.getUserByToken(req.params.token);
    if(!user){
        console.log("error");
        return res.status(404).json({errors : ['User not found']})
    }
    res.json(user);
}
const friendRequest = async (req, res)=>{
    const user = await userService.getUserByToken(req.session.token);
    if(!user){
        console.log("error");
        return res.status(404).json({errors : ['User not found']})
    }
    const request = await userService.makeFriendRequest(user.username, req.params.id);
    res.json(request);
}
const isLoggedIn = async (req, res, next) => {
    if (req.session.token == null)
    {
        res.redirect('login.html')
    }
    else {
        return next();
    }
}
const getFriends = async (req, res) => {
    try {
        const friendsList = await userService.getAllFriends(req.params.id, req.session.token);
        console.log(req.params.id);
        console.log(req.session.token);
        console.log('Friends list:', friendsList);
        res.render('friends.ejs', {friends: friendsList});
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).send('An error occurred while fetching friends.');
    }
}
const checkLogin = async (req, res) => {
    console.log("get login request");
    const user = await userService.login(req.body.username, req.body.password);
    if(!user){
        res.json(0);
        return;
    }
    req.session.token = user.token;
    console.log("token is: " + req.session.token);
    res.json(1);
}

module.exports = { createUser, deleteUser, getUser, updateUser, isLoggedIn
    ,getFriends, checkLogin, getUserFromToken, friendRequest}
