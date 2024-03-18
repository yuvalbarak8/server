const posts = require('../services/posts')
const User = require('../services/user')


//get /posts
async function getAllPosts(req, res) {
    try {
        const postsList = await posts.getPosts({});
        // Convert publishDate strings to Date objects
        postsList.forEach(post => {
            post.publishDate = new Date(post.publishDate);
        });
        // Sort posts by publishDate
        postsList.sort((a, b) => a.publishDate - b.publishDate);
        res.json(postsList);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('An error occurred while fetching posts.');
    }
}

//get users/:id/posts
async function getFriendPosts(req, res) {
    const user = await User.getUserById(req.params.id)
    const postList = await posts.getPostsForUser(user.displayName)
    res.json(postList)
}

async function createPost(req, res) {
    console.log(req.body);
    const display = String(req.body.display);
    const text = String(req.body.text);
    const img = String(req.body.img);

    // Assuming getUserByUsername returns an object with a profilePicture property
    const user = await User.getUserByUsername(req.body.display);
    const profilePicture = await user ? String(user.profileImage) : '';

    const response = await posts.addPost(display, text, img, profilePicture);
    console.log(response);
    res.json(response);
}

//patch users/:id/posts/:pid
async function editPost(req, res) {
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
    if (!newPost)
        return res.status(404).json({error: ['post not found']})
    res.json(newPost)
}
//delete users/:id/posts/:pid
async function deletePostById(req, res) {
    const postId = req.params.pid
    const post = await posts.deletePost(postId)
    if (!post) {
        res.status(404).json({error: ['post not found']})
    }
    res.json(post)
}
//post posts/:pid/likes
async function clickLike(req, res) {
    const post = await posts.getPost(req.params.pid)
    const liker = req.params.id
    const userLikedPost = await  User.getUserById(liker);
    if(posts.isLiked(post, liker)) {
        res.json(await posts.unlike(post, userLikedPost.displayName))
    } else {
        res.json(await posts.like(post, userLikedPost.displayName))
    }
}

async function getLikes(req, res) {
    const post = await posts.getPost(req.params.pid)
    res.json(posts.getLikes(post))
}

module.exports = {getAllPosts, createPost, editPost, deletePostById, clickLike, getFriendPosts, getLikes}