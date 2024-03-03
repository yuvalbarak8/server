const postController = require('../controllers/posts')

const express = require('express')
const router = express.Router();

router.route('/')
    .post(postController.createPost)
    .get(postController.getAllPosts)

router.route('/:id')
    .patch(postController.editPost)
    .delete(postController.deletePostById)

module.exports = router