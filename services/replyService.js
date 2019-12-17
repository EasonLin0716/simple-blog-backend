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
      include: [Clap, User]
    })

    const post = {
      ...postResult.dataValues,
      postUserId: postResult.dataValues.User.id,
      clapTimes:
        postResult.dataValues.Claps.length > 0
          ? postResult.dataValues.Claps.map(d => d.clap).reduce((a, b) => a + b)
          : 0
    }
    const currentUser = req.user
    return callback({ replies, post, currentUser })
  },

  postReply: async (req, res, callback) => {
    const reply = await Reply.create({
      content: req.body.content,
      UserId: req.user.id,
      PostId: req.params.id
    })
    return callback({ status: 'success', message: '', PostId: reply.PostId })
  },

  deleteReply: async (req, res, callback) => {
    const reply = await Reply.findByPk(req.params.reply_id)
    await reply.destroy()
    return callback({ status: 'success', message: '', PostId: req.params.id })
  },

  clap: (req, res, callback) => {
    return Clap.findOne({
      where: { UserId: req.user.id, PostId: +req.params.id }
    }).then(clap => {
      if (clap) {
        clap
          .update({
            clap: +(clap.clap + 1)
          })
          .then(() => {
            return callback({
              status: 'success',
              message: '',
              PostId: req.params.id
            })
          })
      } else {
        Clap.create({
          clap: 1,
          UserId: req.user.id,
          PostId: req.params.id
        }).then(() => {
          return callback({
            status: 'success',
            message: '',
            PostId: req.params.id
          })
        })
      }
    })
  }
}
module.exports = replyService
