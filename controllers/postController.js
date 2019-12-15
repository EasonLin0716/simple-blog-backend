const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Clap = db.Clap
const helpers = require('../config/helpers')
const postService = require('../services/postService')

const postController = {
  getPosts: (req, res) => {
    postService.getPosts(req, res, data => {
      return res.render('post/posts', data)
    })
  },

  createPost: (req, res) => {
    return res.render('post/create', { draft: true })
  },

  getPost: (req, res) => {
    postService.getPost(req, res, data => {
      return res.render('post/post', data)
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
