import express from 'express';
import { authFromHeaders } from '../middlewares/auth.js';
import { createNewUser, login, logout, getOneUser } from '../controllers/authControllers.js'; // import request & response function

// initialize router
const router = express.Router();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/

router.post('/register', createNewUser);
router.post('/login', login);
router.get('/logout', logout);
router.get('/', authFromHeaders, getOneUser);

export default router;
