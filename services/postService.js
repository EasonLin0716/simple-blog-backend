const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Clap = db.Clap
const Bookmark = db.Bookmark
const helpers = require('../config/helpers')
const Sequelize = require('sequelize')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const postService = {
  getPosts: async (req, res, callback) => {
    const postsResult = await Post.findAll({
      order: Sequelize.literal('rand()'),
      include: [User, { model: Bookmark, required: false }]
    })
    const posts = postsResult.map(d => ({
      id: d.id,
      title: d.title,
      content: d.content,
      cover: d.cover,
      readTime: helpers.getReadTime(d.content),
      monthDay: helpers.getMonthDay(String(d.createdAt)),
      authorId: d.User.id,
      author: d.User.name,
      bookmarkId: d.Bookmarks.map(d => d.UserId)
    }))

    const newPostsResult = await Post.findAll({
      limit: 4,
      order: [['createdAt', 'DESC']],
      include: User
    })
    const newPosts = newPostsResult.map(d => ({
      id: d.id,
      title: d.title,
      content: d.content,
      cover: d.cover,
      readTime: helpers.getReadTime(d.content),
      monthDay: helpers.getMonthDay(String(d.createdAt)),
      authorId: d.User.id,
      authorAvatar: d.User.avatar,
      author: d.User.name
    }))

    const popularPostsResult = await Post.findAll({
      include: [Clap, User]
    })
    let popularPosts = popularPostsResult.map(d => ({
      id: d.id,
      title: d.title,
      content: d.content,
      cover: d.cover,
      claps:
        d.Claps.length === 0
          ? 0
          : d.Claps.length === 1
          ? d.Claps[0].clap
          : d.Claps.reduce((a, b) => a.clap + b.clap),
      readTime: helpers.getReadTime(d.content),
      monthDay: helpers.getMonthDay(String(d.createdAt)),
      authorId: d.User.id,
      author: d.User.name
    }))
    popularPosts = popularPosts.sort((a, b) => b.claps - a.claps).slice(0, 4)

    return callback({ posts, newPosts, popularPosts })
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
      post.dataValues.applauseFrom = `Applause from ${clappedUsers[0]}`
    } else if (clappedUsers.length === 2) {
      post.dataValues.applauseFrom = `Applause from ${clappedUsers[0]} and ${clappedUsers[1]}`
    } else if (clappedUsers.length > 2) {
      post.dataValues.applauseFrom = `Applause from ${clappedUsers[0]}, ${
        clappedUsers[1]
      } and ${clappedUsers.length - 2} others`
    }
    if (post.Claps.length) {
      post.dataValues.clappedTimes = post.Claps.map(d => d.clap).reduce(
        (a, b) => a + b
      )
    } else {
      post.dataValues.clappedTimes = 0
    }
    post.dataValues.monthDay = helpers.getMonthDay(String(post.createdAt))
    post.dataValues.readTime = helpers.getReadTime(post.content)

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
      title: req.body.title ? req.body.title : 'untitled',
      content: req.body.content ? req.body.content : 'no contents',
      UserId: req.body.UserId,
      cover: 'https://fakeimg.pl/640x480/'
    })
    const { files } = req
    if (files.length) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(files[0].path, async (err, img) => {
        await post.update({
          cover: img.data.link
        })
      })
    }

    return callback({
      status: 'success',
      message: '',
      PostId: post.id
    })
  },

  putPost: async (req, res, callback) => {
    console.log('****')
    console.log(req.body)
    console.log('****')
    const post = await Post.findByPk(req.params.id)
    if (+req.body.userId !== req.user.id) {
      return callback({
        status: 'error',
        message: 'can not edit because you are not author!!',
        PostId: post.id
      })
    }
    await post.update({
      title: req.body.title ? req.body.title : 'untitled',
      content: req.body.content ? req.body.content : 'no contents'
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
