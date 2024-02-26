import express from 'express';
import bodyParser from 'body-parser';
import {router} from './routes/users.js';

const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'))
app.use('/api/users', router)

app.listen(80)