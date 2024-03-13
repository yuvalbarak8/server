const tokenService = require('../services/token');
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')
    if (token == null || jwt.verify(token, process.env.KEY)) {
        res.redirect('login.html')
    } else {
        return next();
    }
}
module.exports = {isLoggedIn};