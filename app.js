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

app.use(cors());
app.use('/posts', router)

app.listen(8989)


