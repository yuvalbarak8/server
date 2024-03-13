const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]
    const user = jwt.verify(token, process.env.KEY)
    if (user.username === req.username && user.body.password === req.body.password) {
        res.status(200)
        next()
    } else {
        res.status(404).send(token)
    }
}
module.exports = {isLoggedIn};