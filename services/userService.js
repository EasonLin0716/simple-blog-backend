const bcrypt = require('bcryptjs')
const helpers = require('../config/helpers')
const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Clap = db.Clap
const Followship = db.Followship
const { Op } = (sequelize = require('sequelize'))

const userService = {
  getUser: async (req, res, callback) => {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Post, include: Clap },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })
    user.Posts.map(post => {
      post.monthDay = helpers.getMonthDay(String(post.createdAt))
      post.readTime = helpers.getReadTime(post.content)
      post.content = post.content.substring(0, 50) + `...`
      post.clappedTime = post.Claps.map(d => d.clap).length
        ? post.Claps.map(d => d.clap).reduce((a, b) => a + b)
        : 0
    })
    if (req.user) {
      user.isFollowing = user.Followers.map(user => user.id).includes(
        req.user.id
      )
    }
    return callback({
      user,
      posts: user.Posts,
      currentUser: req.user
    })
  },

  getClaps: async (req, res, callback) => {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Clap, include: { model: Post, include: Clap } },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })
    user.clappedPost = user.Claps.map(clap => clap.Post)
    for (let i = 0; i < user.clappedPost.length; i++) {
      const post = user.clappedPost[i]
      post.clappedTime = 0
      post.Claps.map(postClap => {
        post.clappedTime += postClap.clap
      })
      post.readTime = helpers.getReadTime(post.content)
      post.monthDay = helpers.getMonthDay(String(post.createdAt))
      post.content = post.content.substring(0, 50) + `...`
    }
    return callback({
      user,
      currentUser: req.user
    })
  },

  getHighlights: async (req, res, callback) => {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Post, include: Clap },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })
    return callback({ user, currentUser: req.user })
  },

  getResponses: async (req, res, callback) => {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Post, include: Clap },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })
    return callback({ user, currentUser: req.user })
  },

  getFollowings: async (req, res, callback) => {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Post, include: Clap },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })
    return callback({ user, currentUser: req.user })
  },

  getFollowers: async (req, res, callback) => {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Post, include: Clap },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })
    return callback({ user, currentUser: req.user })
  },

  putUser: async (req, res, callback) => {
    const user = await User.findByPk(req.params.id)
    await user.update({
      name: req.body.name,
      introduction: req.body.introduction
    })
    return callback({
      status: 'success',
      message: '',
      UserId: user.id
    })
  },

  addFollowing: async (req, res, callback) => {
    await Followship.create({
      followerId: req.user.id,
      followingId: +req.params.id
    })
    return callback({
      status: 'success',
      message: ''
    })
  },

  deleteFollowing: async (req, res, callback) => {
    await Followship.destroy({
      where: {
        followerId: req.user.id,
        followingId: +req.params.id
      }
    })
    return callback({
      status: 'success',
      message: ''
    })
  }
}

module.exports = userService
