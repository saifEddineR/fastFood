const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// @desc  register a new user
// @params POST /api/v1/users/register
// @access PUBLIC
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userName, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(404).json({ msg: 'email already exist.' });
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    const newUser = await User.create({ userName, email, password: hash });
    const token = await jwt.sign({ sub: newUser._id }, process.env.JWT_SECRET);
    res.json({
      msg: 'user created',
      token,
      userInfo: {
        userName: existUser.userName,
        email: existUser.email,
        role: existUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'something went wrong !' });
  }
};

// @desc  login as a user
// @params POST /api/v1/users/login
// @access PRIVATE users
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) return res.status(404).json({ msg: 'You should register first.' });
    const verifyPassword = await bcrypt.compare(password, existUser.password);
    if (!verifyPassword) return res.status(401).json({ msg: 'Password is incorrect.' });
    const token = await jwt.sign({ sub: existUser._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
      userInfo: {
        userName: existUser.userName,
        email: existUser.email,
        role: existUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'something went wrong !' });
  }
};

// @desc  Get user data
// @params GET /api/v1/users/
// @access PRIVATE

exports.getUserData = async (req, res) => {
  try {
    console.log(req.userId);
    const user = await User.findOne({ _id: req.userId }).select('-password -__v');
    if (!user) return res.status(401).json({ msg: 'You are not authorized.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'something went wrong !' });
  }
};
