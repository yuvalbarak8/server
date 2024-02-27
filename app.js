import express from 'express';
import bodyParser from 'body-parser';
import {tokens_router} from './routes/tokens.js';

const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'))
app.use('/api/tokens', tokens_router)

app.listen(80)