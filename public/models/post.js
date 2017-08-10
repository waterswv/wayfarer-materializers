const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String // FIXME: require character limit to 1-200 chars
  postImage: user.userImage // FIXME: correct reference syntax?
  description: String, // FIXME: text required
  userAuthor: user.username // FIXME: correct??
  postDate: Date.now
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
