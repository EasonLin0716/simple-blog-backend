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
    postService.addPost(req, res, data => {
      return res.redirect(`/posts/${data.PostId}`)
    })
  },

  editPost: (req, res) => {
    return Post.findByPk(req.params.id).then(post => {
      return res.render('post/edit', { post })
    })
  },

  putPost: (req, res) => {
    postService.putPost(req, res, data => {
      return res.redirect(`/posts/${data.PostId}`)
    })
  },

  deletePost: (req, res) => {
    postService.deletePost(req, res, data => {
      return res.redirect(`/users/${data.UserId}`)
    })
  }
}

module.exports = postController
