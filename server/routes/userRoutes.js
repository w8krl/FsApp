const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password, 
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user.id }, 'your_jwt_secret', {
    expiresIn: '1h'
  });

  res.json({ message: 'Logged in successfully', token: token });
});

module.exports = router;
