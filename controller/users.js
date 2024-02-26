import {createUser, getUsers, getUser, login} from "../models/users.js";

function register(req, res){
    createUser(req.body.username,req.body.password)
    console.log(getUsers())
}

function get_Users(req, res){
    console.log(getUsers())
}
function get_user(req, res){
    console.log(getUser(parseInt(req.params.id)))
}
function check_login(req, res)
{
   const check = login(req.body.username,req.body.password);
   console.log(check);
}

export {register, get_Users, get_user, check_login}