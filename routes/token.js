const tokenController = require('../controllers/token');
const express = require('express');
var router = express.Router();

router.route('/').post(tokenController.isLoggedIn);

module.exports = router;