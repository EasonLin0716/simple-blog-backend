const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Clap = db.Clap
const helpers = require('../config/helpers')

const replyService = {
  getReplies: async (req, res, callback) => {
    const replies = await Reply.findAll({
      where: { PostId: +req.params.id },
      include: [User, Post]
    })
    return callback({ replies })
  }
}
module.exports = replyService
