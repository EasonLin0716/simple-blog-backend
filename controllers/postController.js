const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Followship = db.Followship
const helpers = require('../config/helpers')

const postController = {
  getPosts: (req, res) => {
    return res.render('post/posts')
  },

  createPost: (req, res) => {
    return res.render('post/create', { draft: true })
  },

  getPost: (req, res) => {
    return Post.findByPk(req.params.id, { include: User }).then(post => {
      const author = post.User
      post.monthDay = helpers.getMonthDay(String(post.createdAt))
      return res.render('post/post', { post, author })
    })
  },

  addPost: (req, res) => {
    return Post.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.user.id
    }).then(post => {
      res.redirect(`/posts/${post.id}`)
    })
  },

  editPost: (req, res) => {
    return Post.findByPk(req.params.id).then(post => {
      return res.render('post/edit', { post })
    })
  },

  putPost: (req, res) => {
    return Post.findByPk(req.params.id).then(post => {
      return post
        .update({
          title: req.body.title,
          content: req.body.content
        })
        .then(post => {
          return res.redirect(`/posts/${post.id}`)
        })
    })
  },

  deletePost: (req, res) => {
    return res.send('DELETE 刪除一則部落格')
  }
}

module.exports = postController
