const postController = require('../controllers/posts')

const express = require('express')
const router = express.Router();

router.route('/')
    .get(postController.getAllPosts)

router.route('/:pid/likes')
    .post(postController.clickLike)
    .get(postController.getLikes)

module.exports = router