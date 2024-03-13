const postController = require('../controllers/posts')
const userController = require('../controllers/user')

const express = require('express')
const router = express.Router();

router.route('/')
    .get(postController.getAllPosts)

router.route('/:pid')
    .patch(postController.editPost)
    .delete(postController.deletePostById)

router.route(':pid/likes')
    .post(postController.clickLike)
    .get(postController.getLikes)

module.exports = router