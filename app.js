const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const router = require('./routes/posts')


mongoose.connect('mongodb://localhost:27017', {
    dbName: 'project',
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(express.json())

app.use(cors());
app.use('/posts', router)
app.delete('/posts/:id', async (req, res) => {
    console.log(`Deleting post with ID ${req.params.id}`);
    try {
        // Your code to delete the post goes here
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

app.listen(8989)


