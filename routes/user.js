const userController = require('../controllers/user');
const express = require('express');
const postController = require("../controllers/posts");
var router = express.Router();

router.route('/:id')
    .delete(userController.deleteUser)
    .get(userController.getUser);
router.route('/')
    .post(userController.createUser)
    .put(userController.updateUser);
router.route('/login')
    .post(userController.checkLogin);
router.route('/token/:token')
    .get(userController.getUserFromToken);
router.route('/:id/friends')
    .get(userController.getFriends)
    .post(userController.friendRequest);
router.route('/:id/posts/:pid')
    .patch(postController.editPost)
    .delete(postController.deletePostById)
router.route('/:id/posts')
    .post(postController.createPost);
router.route('/:id/posts/:pid/likes')
    .post(postController.clickLike)

module.exports = router;
