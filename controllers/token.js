const tokenService = require('../services/token');

const getTokenByUsername = async (req, res) => {
    res.json(await tokenService.getToken(req.body.username));
};
module.exports = { getTokenByUsername : getTokenByUsername};