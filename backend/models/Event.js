const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: String,
  time: String,
  createdBy: { type: String, default: 'admin' },
  volunteers: [String], // array of usernames who enrolled
});

module.exports = mongoose.model('Event', eventSchema);
