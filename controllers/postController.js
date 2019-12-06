const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Followship = db.Followship

const postController = {
  getPosts: (req, res) => {
    return res.render('post/posts')
  },

  createPost: (req, res) => {
    return res.render('post/create')
  },

  getPost: (req, res) => {
    return Post.findByPk(req.params.id, { include: User }).then(post => {
      const author = post.User
      return res.render('post/post', { post, author })
    })
  },

  addPost: (req, res) => {
    return res.send('POST 新增一篇部落格')
  },

  editPost: (req, res) => {
    return res.render('post/edit')
  },

  putPost: (req, res) => {
    return res.send('PUT 更新一則部落格')
  },

  deletePost: (req, res) => {
    return res.send('DELETE 刪除一則部落格')
  }
}

module.exports = postController
