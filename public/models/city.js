const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  cityName: String,
  cityCountry: String,
  cityImage: String,
  posts: [PostSchema]
})

const City = mongoose.model('City', CitySchema);

module.exports = City;
