const replyService = require('../../services/replyService')

const replyController = {
  getReplies: (req, res) => {
    replyService.getReplies(req, res, data => {
      return res.json(data)
    })
  },
  postReply: (req, res) => {
    replyService.postReply(req, res, data => {
      return res.json(data)
    })
  },
  deleteReply: (req, res) => {
    replyService.deleteReply(req, res, data => {
      return res.json(data)
    })
  },
  clap: (req, res) => {
    replyService.clap(req, res, data => {
      return res.json(data)
    })
  },
  addBookmark: (req, res) => {
    replyService.addBookmark(req, res, data => {
      return res.json(data)
    })
  },
  deleteBookmark: (req, res) => {
    replyService.deleteBookmark(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = replyController
