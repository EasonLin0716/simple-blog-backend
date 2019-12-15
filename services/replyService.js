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
      include: User
    })
    const postResult = await Post.findOne({
      where: { id: +req.params.id },
      include: Clap
    })

    const post = {
      ...postResult.dataValues,
      clapTimes:
        postResult.dataValues.Claps.length > 0
          ? postResult.dataValues.Claps.map(d => d.clap).reduce((a, b) => a + b)
          : 0
    }
    return callback({ replies, post })
  },

  postReply: async (req, res, callback) => {
    const reply = await Reply.create({
      content: req.body.content,
      UserId: req.user.id,
      PostId: req.params.id
    })
    return callback({ status: 'success', message: '', PostId: reply.PostId })
  }
}
module.exports = replyService
