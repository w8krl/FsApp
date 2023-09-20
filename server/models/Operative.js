const mongoose = require('mongoose');

// Define schema
const operativeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2  // Add validation like minimum length
  },
  experience: {
    type: Number, // Changed to Number
    required: true
  },
  last_known_location: {
    latitude: Number, // Changed to Number
    longitude: Number // Changed to Number
  },
  date_of_last_known_location: {
    type: Date,
    required: true
  }
});

// Create model
const Operative = mongoose.model('Operative', operativeSchema);

module.exports = Operative;
