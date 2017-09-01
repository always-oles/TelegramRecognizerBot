const mongoose = require('mongoose');

// Schema for users hits
const UserSchema = new mongoose.Schema({
  name:  { type: String, unique: true },
  hits: Number
});

module.exports = {
  User: mongoose.model('User', UserSchema)
}
