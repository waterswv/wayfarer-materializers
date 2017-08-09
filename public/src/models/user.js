const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  userImage: String,
  joinDate: Date, // FIXME: is this the correct format?
  userCity: String // FIXME: id of the chosen city
})

const User = mongoose.model('User', CitySchema);

module.exports = User;
