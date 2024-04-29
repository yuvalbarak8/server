const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')
const net = require('net');

// Initialize BloomFilter
function initializeBloomFilter() {
    const client = new net.Socket();
    client.connect(5555, "127.0.0.1", () => {
        console.log('Connected to TCP server to initialize BloomFilter');
        client.write('8 1 2\n'); // Init command with parameters for BloomFilter
    });

    client.on('data', (data) => {
        console.log('Received: ' + data.toString());
        client.destroy(); // kill client after server's response
       // sendURLsToBloomFilter(); // Proceed to send URLs after initialization
    });

    client.on('close', () => {
        console.log('Connection to TCP server closed');
    });

    client.on('error', (err) => {
        console.error('Connection to TCP server error:', err);
    });
}

// Send URLs to BloomFilter
// function sendURLsToBloomFilter() {
//     const client = new net.Socket();
//     const urls = ['www.example.com0'];
//     client.connect(5555, "192.168.64.128", () => {
//         console.log('Connected to TCP server to send URLs');
//         urls.forEach(url => {
//             client.write(`INSERT ${url}`); // Send each URL with INSERT command
//         });
//     });
//
//     client.on('data', (data) => {
//         console.log('Received: ' + data.toString());
//     });
//
//     client.on('end', () => {
//         console.log('All URLs sent, server closed connection');
//         client.destroy();
//     });
//
//     client.on('error', (err) => {
//         console.error('Connection error:', err);
//     });
// }

// Start the server and initialize BloomFilter
initializeBloomFilter();

// sendURLsToBloomFilter();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
app.use('/api/posts', posts)
app.use('/api/token', token);

app.listen(process.env.PORT);
