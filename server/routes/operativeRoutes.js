const express = require('express');
const router = express.Router();
const Operative = require('../models/Operative');

router.get('/', async (req, res) => {
  const operatives = await Operative.find();
  res.json(operatives);
});

module.exports = router;
