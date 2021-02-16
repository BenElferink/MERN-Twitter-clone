import express from 'express';
import { authFromCookie } from '../middlewares/auth.js';
import {
  getAllUsers,
  toggleFollowingUser,
  postTweet,
  getFeedTweets,
} from '../controllers/twitterControllers.js'; // import request & response function

// initialize router
const router = express.Router();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/

router.get('/users', authFromCookie, getAllUsers);
router.post('/follow/:id', authFromCookie, toggleFollowingUser);
router.post('/tweet', authFromCookie, postTweet);
router.get('/tweets', authFromCookie, getFeedTweets);

export default router;
