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
    user.Posts.sort((a, b) => b.createdAt - a.createdAt)
    user.Posts.map(post => {
      post.dataValues.monthDay = helpers.getMonthDay(String(post.createdAt))
      post.dataValues.readTime = helpers.getReadTime(post.content)
      post.content = post.content.substring(0, 100) + `...`
      post.dataValues.clappedTime = post.Claps.map(d => d.clap).length
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
    const userResult = await User.findByPk(req.params.id, {
      include: [
        { model: Clap, include: { model: Post, include: Clap } },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })
    const user = {
      id: userResult.id,
      name: userResult.name,
      avatar: userResult.avatar,
      introduction: userResult.introduction,
      isAdmin: userResult.isAdmin,
      createdAt: userResult.createdAt,
      updatedAt: userResult.updatedAt,
      followers: userResult.Followers,
      followings: userResult.Followings
    }
    const posts = userResult.Claps.map(d => ({
      id: d.Post.id,
      title: d.Post.title,
      content: d.Post.content,
      cover: d.Post.cover,
      readTime: helpers.getReadTime(d.Post.content),
      monthDay: helpers.getMonthDay(String(d.Post.createdAt)),
      clappedTime: 0
    }))
    for (let i = 0; i < userResult.Claps.length; i++) {
      userResult.Claps[i].Post.Claps.map(d => {
        posts[i].clappedTime += d.clap
      })
    }

    return callback({
      user,
      posts,
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
    const userResult = await User.findByPk(req.params.id, {
      include: [
        { model: Reply, include: { model: Post, include: [Clap, Reply] } },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })

    const user = {
      id: userResult.id,
      name: userResult.name,
      avatar: userResult.avatar,
      introduction: userResult.introduction,
      isAdmin: userResult.isAdmin,
      createdAt: userResult.createdAt,
      updatedAt: userResult.updatedAt,
      followers: userResult.Followers,
      followings: userResult.Followings
    }

    const replies = userResult.Replies.map(d => ({
      replyContent: d.content,
      readTime: helpers.getReadTime(d.content),
      monthDay: helpers.getMonthDay(String(d.createdAt)),
      postTitle: d.Post.title,
      postClapTimes:
        d.Post.Claps.length === 1
          ? d.Post.Claps[0].clap
          : d.Post.Claps.length > 1
          ? d.Post.Claps.reduce((a, b) => a.clap + b.clap)
          : 0,
      postReplyTimes: d.Post.Replies.length
    }))

    return callback({ replies, user, currentUser: req.user })
  },

  getFollowings: async (req, res, callback) => {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Post, include: Clap },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })
    const followings = user.Followings

    return callback({ followings })
  },

  getFollowers: async (req, res, callback) => {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Post, include: Clap },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    })
    const followers = user.Followers

    return callback({ followers })
  },

  putUser: async (req, res, callback) => {
    if (!req.body.name || !req.body.introduction) {
      return callback({
        status: 'error',
        message: 'every column must be input'
      })
    }
    const user = await User.findByPk(req.user.id)
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
