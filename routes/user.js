const userController = require('../controllers/user');

const express = require('express');
var router = express.Router();

router.route('/:id')
    .delete(userController.deleteUser)
    .get(userController.getUser);
router.route('/')
    .post(userController.createUser)
    .put(userController.updateUser);
router.route('/login')
    .post(userController.checkLogin);

module.exports = router;
