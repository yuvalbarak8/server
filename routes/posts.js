const postController = require('../controllers/posts')
const userController = require('../controllers/user')

const express = require('express')
const router = express.Router();

router.route('/')
    .post(postController.createPost)
    .get(postController.getAllPosts)

router.route('/posts/:pid')
    .patch(postController.editPost)
    .delete(postController.deletePostById)
router.route('/:id/posts/:pid').post(postController.clickLike)

module.exports = router