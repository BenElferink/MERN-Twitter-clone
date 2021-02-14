import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// more about response status codes   --->   https://restapitutorial.com/httpstatuscodes.html

export const createNewUser = async (request, response, next) => {
  try {
    const { name, username, email, password, imageBase64 } = request.body;

    // validations
    if (!name || !username || !email || !password)
      return response.status(400).json({
        message: 'please enter all required fields',
        requiredFields: ['name', 'username', 'email', 'password'],
      });

    if (password.length < 7)
      return response.status(400).json({ message: 'password must contain at least 7 characters' });

    const foundByEmail = await User.findOne({ email });
    if (foundByEmail)
      return response.status(400).json({ message: 'a user exists with that email', email });

    const foundByUsername = await User.findOne({ username });
    if (foundByUsername)
      return response.status(400).json({ message: 'a user exists with that username', username });

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    // create user
    let newUser = new User({
      name,
      username,
      email,
      passwordHash: hash,
      profilePicture: imageBase64,
    });
    const savedUser = await newUser.save();

    // generate token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // send cookie
    response
      .status(201)
      .cookie('token', token, {
        httpOnly: true,
        // expires: new Date(new Date().setTime(new Date().getTime() + 1 * 60 * 60 * 1000)), // 1 hour
      })
      .json({
        message: 'account created',
        user: {
          name: savedUser.name,
          username: savedUser.username,
          profilePicture: savedUser.profilePicture,
        },
      });
  } catch (error) {
    console.error('❌', error);
    response.status(500).send();
  }
};

export async function getAllUsers(request, response, next) {
  try {
    // fetch all users
    const allUsers = await User.find().select('username profilePicture');

    response.status(200).json({ message: 'users fetched', users: allUsers });
  } catch (error) {
    console.error('❌', error);
    response.status(500).send();
  }
}