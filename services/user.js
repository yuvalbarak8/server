const User = require('../models/user');

const createUser = async (username, password) => {
    const user = new User({ username: username, password: password });
    return await user.save();
};

module.exports = { createUser: createUser };
