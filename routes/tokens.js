import {create_token} from "../controller/tokens.js";

import express from "express";
const tokens_router = express.Router();

tokens_router.post('/', create_token);

export {tokens_router}
