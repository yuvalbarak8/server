const posts = require('../services/posts')

async function getAllPosts(req, res) {
    try {
        const postsList = await posts.getPosts({});
        res.json(postsList);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('An error occurred while fetching posts.');
    }
}

async function createPost(req, res) {
    console.log(req.body)
    const display = String(req.body.display);
    const text = String(req.body.text);
    const img = String(req.body.img);
    const profile = String(req.body.profile);
    const response = await posts.addPost(display, text, img, profile)
    console.log(response)
    res.json(response)
}
async function editPost(req, res){
    const id = req.params.pid
    const text = req.body.text
    const img = req.body.img
    let newPost
    if (text !== "") {
        newPost = await posts.updatePost(id, text)
    }
    if (img !== "") {
        newPost = await posts.updatePostImg(id, img)
    }
    if(!newPost)
        return res.status(404).json({error: ['post not found']})
    res.json(newPost)
}
async function deletePostById(req, res) {
    const postId = req.params.pid
    const post = await posts.deletePost(postId)
    if (!post) {
        res.status(404).json({error: ['post not found']})
    }
    res.json(post)
}
async function clickLike(req, res) {
    const post = posts.getPost(req.params.pid)
    const liker = req.params.id
    if(post.likes.includes(liker))
        res.json(posts.unlike(post, liker))
    else
        res.json(posts.like(post, liker))
}

module.exports = {getAllPosts, createPost, editPost, deletePostById, clickLike}