import User from '../models/User.js';
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
