const Post = require('../models/posts')

async function getPosts({}) {
    return Post.find({});

}
module.exports = {getPosts}