const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const session = require('express-session')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));

const cors = require('cors');
app.use(cors());
app.use(express.static('public'))
app.use(session({
    secret: 'foo',
    saveUninitialized: false,
    resave: false
}))

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

const users = require('./routes/user');
const posts = require('./routes/posts');
const token = require('./routes/token');

console.log(process.env.CONNECTION_STRING)
console.log(process.env.PORT)

const mongoose = require("mongoose");
const {isLogged} = require("./controllers/token");
mongoose.connect(process.env.CONNECTION_STRING,
    {
        dbName: 'project',
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


app.use('/api/users', users)
app.use('/api/posts', isLogged, posts)
app.use('/api/token', token);

app.listen(process.env.PORT);
