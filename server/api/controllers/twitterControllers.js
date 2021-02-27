import User from '../models/User.js';
import Tweet from '../models/Tweet.js';
import ReTweet from '../models/ReTweet.js';
// more about response status codes   --->   https://restapitutorial.com/httpstatuscodes.html

export async function getAllUsers(request, response, next) {
  try {
    // fetch all users
    const allUsers = await User.find().select('username profilePicture');

    response.status(200).json({
      message: 'users fetched',
      users: allUsers,
    });
  } catch (error) {
    console.error('❌', error);
    response.status(500).send();
  }
}

export async function toggleFollowingUser(request, response, next) {
  try {
    const { user } = request;
    const { id } = request.params;

    // find person to follow/unfollow
    const personToFollow = await User.findOne({ _id: id });
    if (!personToFollow)
      return response.status(404).json({
        message: 'user not found',
        id,
      });
    // add requesting user to the opposite user followers list (or remove if exists)
    const followerIndex = personToFollow.followers.findIndex((item) => item.equals(user));
    if (followerIndex === -1) {
      personToFollow.followers.push(id);
    } else {
      personToFollow.followers.splice(followerIndex, 1);
    }
    await personToFollow.save();

    // add opposit user to following list (or remove if exists)
    const requestOwner = await User.findOne({ _id: user });
    const followingIndex = requestOwner.following.findIndex((item) => item.equals(id));
    if (followingIndex === -1) {
      requestOwner.following.push(id);
    } else {
      requestOwner.following.splice(followingIndex, 1);
    }
    await requestOwner.save();

    response.status(200).json({
      message: 'un/follow request success',
      user: {
        id: requestOwner._id,
        name: requestOwner.name,
        username: requestOwner.username,
        profilePicture: requestOwner.profilePicture,
        following: requestOwner.following,
        followers: requestOwner.followers,
      },
    });
  } catch (error) {
    console.error('❌', error);
    response.status(500).send();
  }
}

export async function postTweet(request, response, next) {
  try {
    const { user } = request;
    const { message, image } = request.body;

    const newTweet = new Tweet({
      from: user,
      message,
      image,
    });
    await newTweet.save();
    await Tweet.populate(newTweet, {
      path: 'from',
      select: 'name username profilePicture',
    });

    response.status(201).json({
      message: 'tweet created',
      tweet: newTweet,
    });
  } catch (error) {
    console.error('❌', error);
    response.status(500).send();
  }
}

export async function getFeedTweets(request, response, next) {
  try {
    const { user } = request;

    // find user
    const foundUser = await User.findOne({ _id: user });

    // find all tweets from user && following
    let allTweets = await Tweet.find({ from: user }).populate({
      path: 'from',
      select: 'name username profilePicture',
    });

    for (let i = 0; i < foundUser.following.length; i++) {
      const newTweets = await Tweet.find({ from: foundUser.following[i] }).populate({
        path: 'from',
        select: 'name username profilePicture',
      });
      allTweets = allTweets.concat(newTweets);
    }

    // sort by timestamp
    allTweets = allTweets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // send to client
    response.status(200).json({
      message: 'tweets fetched',
      tweets: allTweets,
    });
  } catch (error) {
    console.error('❌', error);
    response.status(500).send();
  }
}
