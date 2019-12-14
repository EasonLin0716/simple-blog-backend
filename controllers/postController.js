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
    return Post.findByPk(req.params.id, {
      include: [
        { model: User, include: [{ model: User, as: 'Followers' }] },
        { model: Clap, include: User }
      ]
    }).then(post => {
      const clappedUsers = post.Claps.map(d => d.User.name)
      if (clappedUsers.length === 1) {
        post.applauseFrom = `Applause from ${clappedUsers[0]}`
      } else if (clappedUsers.length === 2) {
        post.applauseFrom = `Applause from ${clappedUsers[0]} and ${clappedUsers[1]}`
      } else if (clappedUsers.length > 2) {
        post.applauseFrom = `Applause from ${clappedUsers[0]}, ${
          clappedUsers[1]
        } and ${clappedUsers.length - 2} others`
      }
      if (post.Claps.length) {
        post.clappedTimes = post.Claps.map(d => d.clap).reduce((a, b) => a + b)
      }
      post.monthDay = helpers.getMonthDay(String(post.createdAt))
      post.readTime = helpers.getReadTime(post.content)

      const author = post.User
      if (req.user) {
        author.isFollowedByCurrentUser = post.User.Followers.map(
          d => d.id
        ).includes(+req.user.id)
      }
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
