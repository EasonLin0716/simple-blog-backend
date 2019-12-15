const postService = require('../../services/postService')
const replyService = require('../../services/replyService')

const postController = {
  getPosts: (req, res) => {
    postService.getPosts(req, res, data => {
      return res.json(data)
    })
  },
  getPost: (req, res) => {
    postService.getPost(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = postController