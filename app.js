import express from 'express';
import bodyParser from 'body-parser';
import {tokens_router} from './routes/tokens.js';
import {router} from './routes/users.js';


const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static('public'))
app.use('/api/tokens', tokens_router)

app.use(express.static('public'))
app.use('/api/users', router)


app.listen(80)