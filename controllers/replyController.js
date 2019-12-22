const db = require('../models')
const Post = db.Post
const Clap = db.Clap
const replyService = require('../services/replyService')

const replyController = {
  getReplies: (req, res) => {
    replyService.getReplies(req, res, data => {
      return res.render('post/reply', data)
    })
  },
  postReply: (req, res) => {
    replyService.postReply(req, res, data => {
      return res.redirect(`/posts/replies`)
    })
  },
  deleteReply: (req, res) => {
    replyService.deleteReply(req, res, data => {
      return res.redirect(`/posts/${data['PostId']}/replies`)
    })
  },

  clap: (req, res) => {
    replyService.clap(req, res, data => {
      return res.redirect('back')
    })
  },
  // 此功能仍在評估是否要做
  unClap: (req, res) => {
    return res.send('POST 撤回一次鼓掌')
  },

  addBookmark: (req, res) => {
    replyService.addBookmark(req, res, data => {
      return res.redirect('back')
    })
  },

  deleteBookmark: (req, res) => {
    return res.send('DELETE 刪除一個書籤')
  }
}

module.exports = replyController
