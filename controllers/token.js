const jwt = require("jsonwebtoken");
const tokenService = require('../services/token')

async function login(req, res) {
    const user = await tokenService.findUser(req.body.username, req.body.password)
    console.log({user})
    if (user) {
        res.status(200).json({user})
    } else {
        res.status(404)
    }
}

async function isLogged(req, res, next) {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const data = jwt.verify(token, process.env.KEY)
            if (data._id === req.params.id) {
                return next()
            }
        } catch (err) {
            return res.status(401).send('invalid token')
        }
    } else {
        return res.status(403).send('token required')
    }
}

module.exports = {login, isLogged};