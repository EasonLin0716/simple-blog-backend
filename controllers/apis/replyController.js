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
  }
}

module.exports = replyController
