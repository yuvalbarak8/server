import {createToken} from "../models/tokens.js";

function create_token(req, res){
    console.log(createToken(req.body.username))
}
export {create_token}