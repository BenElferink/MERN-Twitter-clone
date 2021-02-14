import express from 'express';
import { getAllUsers, createNewUser } from '../controllers/userControllers.js'; // import request & response function

// initialize router
const router = express.Router();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/

router.post('/new', (request, response, next) => next(), createNewUser);
router.get('/', (request, response, next) => next(), getAllUsers);

export default router;
