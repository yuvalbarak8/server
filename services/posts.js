const Post = require('../models/posts')

function getPosts({}) {
    return Post.find({});

}

async function addPost(display, text, img, profile) {
    const newPost = new Post({
        username: display,
        text: text,
        img: img,
        profilePic: profile,
        comments: [],
        likes: []
    });
    console.log(newPost)
    return newPost.save()
}

async function updatePost(postId, newText) {
    const post = await Post.findById(postId);
    if (!post) return null;
    const updatedPost = {
        $set: {
            text: newText
        }
    };
    return Post.updateOne({_id: postId}, updatedPost, {runValidators: true});
}
async function updatePostImg(postId, newImg) {
    const post = await Post.findById(postId);
    if (!post) return null;
    const updatedPost = {
        $set: {
            img: newImg
        }
    };
    return Post.updateOne({_id: postId}, updatedPost, {runValidators: true});
}
async function deletePost(id) {
    return Post.findByIdAndDelete(id)
}
async function like(post, userId){
    post.likes.push(userId)
    return post.save()
}
async function unlike(post, userId){
    let i = post.likes.indexOf(userId)
    post.likes.splice(i, 1)
    return post.save()
}
function getPost(id) {
    return Post.findById(id)
}
module.exports = {getPosts, addPost, updatePost, updatePostImg, deletePost, like, unlike, getPost}