const jwt = require("jsonwebtoken")
const key = "Am Israel Hai"
const getToken = async(username) => {
    const token = await jwt.sign(username, key);
    return token;
}
module.exports = {getToken : getToken};