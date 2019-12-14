const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Clap = db.Clap
const helpers = require('../config/helpers')

const postService = {
  getPosts: async (req, res, callback) => {
    const posts = await Post.findAll()
    return callback({ posts })
  }
}

module.exports = postService
