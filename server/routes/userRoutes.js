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
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({
    message: 'Logged in successfully',
    token: token,
    user: {
        id: req.user.id,
        username: req.user.username
    }
});

});

router.get('/addTempUser', async (req, res) => {
  const tempUsername = "karl";
  const tempPassword = "karl123"; 
  
  try {
      const tempUser = new User({
          username: tempUsername,
          password: tempPassword,
      });

      const savedUser = await tempUser.save();
      res.json(savedUser);
  } catch (err) {
      res.status(400).json(err);
  }
});



module.exports = router;
