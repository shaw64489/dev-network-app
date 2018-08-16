const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create User schema
const UserSchema = new Schema({
  //User collection fields
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  //current timestamp
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
