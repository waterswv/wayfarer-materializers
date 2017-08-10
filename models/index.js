const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/project-wayfarer' );

const City = require('./city');
const Post = require('./post');
const User = require('./user');

module.exports = {
  City: City,
  Post: Post,
  User: User
};
