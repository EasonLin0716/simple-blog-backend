const postService = require('../../services/postService')

const postController = {
  getPosts: (req, res) => {
    postService.getPosts(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = postController
