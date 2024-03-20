const User = require('../models/user')
async function findUser(username, password) {
    return User.findOne({username: username, password: password})
}
module.exports = {findUser}