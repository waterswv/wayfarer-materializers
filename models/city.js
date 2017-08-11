const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = require('./post');

const CitySchema = new Schema({
  cityName: String,
  cityCountry: String,
  cityImage: String,
  posts: {
    type: PostSchema
  }
})

const City = mongoose.model('City', CitySchema);

module.exports = City;
