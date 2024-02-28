const mongoose = require('mongoose')
const express = require('express')
const postController = require("./controller/posts");
const app = express()

mongoose.connect('mongodb://localhost:27017', {
    dbName: 'project_database',
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.set('view engine', 'ejs');
app.get('/', postController.getAllPosts)

app.listen(3000)


