const userController = require('../controllers/user');
const express = require('express');
const postController = require("../controllers/posts");
var router = express.Router();

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

router.route('/')
    .post(userController.createUser)

router.route('/:id/friends')
    .get(userController.getFriends)
    .post(userController.sendFriendRequest)

router.route('/:id/friends/:fid')
    .patch(userController.approveFriend)
    .delete(userController.rejectFriend)

router.route('/:id/posts/:pid')
    .patch(postController.editPost)
    .delete(postController.deletePostById)

router.route('/:id/posts')
    .get(postController.getFriendPosts)
    .post(postController.createPost);

module.exports = router;
