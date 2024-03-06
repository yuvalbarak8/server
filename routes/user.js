const userController = require('../controllers/user');

const express = require('express');
var router = express.Router();

router.route('/:id').delete(userController.deleteUser);
router.route('/:id').get(userController.getUser);
router.route('/:id/friends').get(userController.getFriends);
router.route('/:id/friends').post(userController.friendRequest);
router.route('/token/:token').get(userController.getUserFromToken);
router.route('/').post(userController.createUser);
router.route('/').put(userController.updateUser);
router.route('/login').post(userController.checkLogin);

module.exports = router;
