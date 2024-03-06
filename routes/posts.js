const postController = require('../controllers/posts')
const userController = require('../controllers/user')

const express = require('express')
const router = express.Router();

router.route('/')
    .post(postController.createPost)
    .get(userController.isLoggedIn,postController.getAllPosts)

router.route('/:id')
    .patch(postController.editPost)
    .delete(postController.deletePostById)

module.exports = router