const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String, // FIXME: require character limit to 1-200 chars
  description: String,
  userAuthor: String,
  // postImage: String, TODO: don't need?
  postDate: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
