const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Clap = db.Clap
const helpers = require('../config/helpers')

const postService = {
  getPosts: async (req, res, callback) => {
    const posts = await Post.findAll()
    return callback({ posts })
  },

  getPost: async (req, res, callback) => {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, include: [{ model: User, as: 'Followers' }] },
        { model: Clap, include: User }
      ]
    })
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
    return callback({ post, author })
  },

  addPost: async (req, res, callback) => {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.user.id
    })
    return callback({
      status: 'success',
      message: '',
      PostId: post.id
    })
  },

  putPost: async (req, res, callback) => {
    const post = await Post.findByPk(req.params.id)
    await post.update({
      title: req.body.title,
      content: req.body.content
    })
    return callback({
      status: 'success',
      message: '',
      PostId: post.id
    })
  },

  deletePost: async (req, res, callback) => {
    await Post.destroy({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    })
    return callback({
      status: 'success',
      message: '',
      UserId: req.user.id
    })
  }
}

module.exports = postService
