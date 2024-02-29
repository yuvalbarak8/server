const userController = require('../controllers/user');

const express = require('express');
var router = express.Router();

router.route('/:id').delete(userController.deleteUser);
router.route('/:id').get(userController.getUser);
router.route('/').post(userController.createUser);


module.exports = router;
