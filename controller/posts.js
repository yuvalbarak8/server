const posts = require('../services/posts')
async function getAllPosts(req, res) {
    try {
        const postsList = await posts.getPosts({});
        console.log(postsList)
        res.render('posts.ejs', { posts: postsList });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('An error occurred while fetching posts.');
    }
}
module.exports = {getAllPosts}