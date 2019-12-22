const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Clap = db.Clap
const Bookmark = db.Bookmark
const helpers = require('../config/helpers')

const replyService = {
  getReplies: async (req, res, callback) => {
    const replies = await Reply.findAll({
      where: { PostId: +req.params.id },
      include: User
    })
    replies.map(d => {
      d.dataValues.monthDay = helpers.getMonthDay(
        d.dataValues.createdAt.toString()
      )
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
      UserId: req.body.id,
      PostId: req.body.postId
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
  },

  addBookmark: async (req, res, callback) => {
    // TODO: 新增一個書籤
    const bookmark = await Bookmark.findOne({
      where: {
        PostId: req.params.id,
        UserId: req.user.id
      }
    })
    if (bookmark) {
      return callback({
        status: 'error',
        message: 'bookmark already exist!',
        PostId: req.params.id
      })
    }
    await Bookmark.create({
      PostId: req.params.id,
      UserId: req.user.id
    })
    return callback({
      status: 'success',
      message: '',
      PostId: req.params.id
    })
  },

  deleteBookmark: async (req, res, callback) => {
    // TODO: 刪除一個書籤
    await Bookmark.destroy({
      where: {
        PostId: req.params.id,
        UserId: req.user.id
      }
    })
    return callback({
      status: 'success',
      message: '',
      PostId: req.params.id
    })
  }
}
module.exports = replyService
