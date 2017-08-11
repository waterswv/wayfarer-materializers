const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  userImage: String,
  joinDate: { type: Date, default: Date.now },
  userCity: String // FIXME: id of the chosen city
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
