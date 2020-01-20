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
  },
  addPost: (req, res) => {
    postService.addPost(req, res, data => {
      return res.json(data)
    })
  },
  putPost: (req, res) => {
    postService.putPost(req, res, data => {
      return res.json(data)
    })
  },
  deletePost: (req, res) => {
    postService.deletePost(req, res, data => {
      return res.json(data)
    })
  },
  searchPost: (req, res) => {
    postService.searchPost(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = postController
