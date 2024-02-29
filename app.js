const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const customEnv = require('custom-env');
customEnv.env(process.env.NODE_ENV, './config');

const users = require('./routes/user');

console.log(process.env.CONNECTION_STRING)
console.log(process.env.PORT)

const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.use('/users', users);
app.use(express.static('public'))


app.listen(process.env.PORT);
