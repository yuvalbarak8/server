const Post = require('../models/posts')
const User = require('./user')

function getPosts({}) {
    return Post.find({});

}
const dgram = require('dgram');



const net = require('net'); // Ensure net is required at the top of your file
//addPost is the main function to create a new post object, save it to a database, and process URLs in the post's text.
async function addPost(new_display, new_text, new_img, new_profile) {
    try {
        const newPost = new Post({
            username: new_display,
            text: new_text,
            img: new_img,
            profilePic: new_profile,
            comments: [],
            likes: []
        });

        // Save the post to the database
        const savedPost = await newPost.save();

        // Extract URLs from the post's text
        const urls = extractUrlsFromText(new_text);

        // If there are URLs, handle them with the TCP server
        if (urls && urls.length) {
            // Use Promise.all to wait for all URLs to be processed
              await Promise.all(urls.map(url => sendUrlToTcpServer(url)));

        }

        return savedPost;
    } catch (error) {
        console.error("Error saving post:", error);
        throw error; // Rethrow the error to handle it elsewhere if needed
    }
}

function extractUrlsFromText(text) {
    const urlRegex = /(\bhttps?:\/\/[^\s\n]+|\bwww\.[^\s\n]+)/g;
    const urls = text.match(urlRegex);
    return urls;
}


//sendUrlToTcpServer is a function that returns a promise, which sends a URL to the TCP server, waits for a response,
// and handles the server's response or any errors that may occur.
function sendUrlToTcpServer(url) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        client.connect(5555, '192.168.64.128', () => {
            console.log(`Connected to TCP server, sending URL: ${url}`);
            client.write(`CHECK ${url}\n`);  // Prefix with CHECK command
        });

        client.on('data', (data) => {
            console.log(`Response from TCP server for URL ${url}: ${data}`);
            client.destroy(); // Kill the client after the server's response
            resolve(data.toString().trim()); // Resolve the promise with the response
        });

        client.on('error', (err) => {
            console.error(`Error communicating with TCP server for URL ${url}:`, err);
            client.destroy();
            reject(err); // Reject the promise on error
        });

        client.on('close', () => {
            console.log(`Connection to TCP server closed for URL ${url}`);
        });
    });
}


async function getPostsForUser(username) {
    return Post.find({username: username});
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
function isLiked(post, liker) {
    return post.likes.includes(liker._id)
}

async function like(post, username) {
    post.likes.push(username)
    return post.save()
}

async function unlike(post, username) {
    let i = post.likes.indexOf(username)
    post.likes.splice(i, 1)
    return post.save()
}

function getPost(id) {
    return Post.findById(id);
}
function getLikes(post) {
    return post.likes
}
module.exports = {
    getPosts,
    addPost,
    updatePost,
    updatePostImg,
    deletePost,
    like,
    unlike,
    getPost,
    getLikes,
    getPostsForUser,
    isLiked
}