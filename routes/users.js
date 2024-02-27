import express from 'express';
import {
    register,
    get_Users,
    get_user,
    check_login
} from "../controller/users.js";
const router = express.Router();

router.get('/:id', get_user);
router.get('/', get_Users);
router.post('/', register);
router.post('/login', check_login)
export {router}