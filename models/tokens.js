import jwt from 'jsonwebtoken';
const key ="Am Israel Hai"

function createToken(username){
    return jwt.sign(username,key);
}

export {createToken}