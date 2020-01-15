const bcrypt = require('bcryptjs')
const db = require('../../models')
const { User, Clap, Bookmark, Post, Reply } = db
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const userService = require('../../services/userService')

let userController = {
  signIn: (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.json({
        status: 'error',
        message: "required fields didn't exist"
      })
    }
    let username = req.body.email
    let password = req.body.password

    User.findOne({
      where: { email: username },
      include: [
        Clap,
        Bookmark,
        { model: Post, include: [Reply] },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ]
    }).then(user => {
      if (!user)
        return res
          .status(401)
          .json({ status: 'error', message: 'no such user found' })
      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .json({ status: 'error', message: 'passwords did not match' })
      }
      const payload = { id: user.id }
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      return res.json({
        status: 'success',
        message: 'ok',
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
          clappedPostId: user.Claps.map(d => d.PostId),
          bookmarkedPostId: user.Bookmarks.map(d => d.PostId),
          followingUserId: user.Followings.map(d => d.id),
          followerUserId: user.Followers.map(d => d.id)
        }
      })
    })
  },
  signUp: (req, res) => {
    if (req.body.passwordCheck !== req.body.password) {
      return res.json({ status: 'error', message: '兩次密碼輸入不同！' })
    } else {
      User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
          return res.json({ status: 'error', message: '信箱重複！' })
        } else {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(10),
              null
            )
          }).then(user => {
            return res.json({ status: 'success', message: '成功註冊帳號！' })
          })
        }
      })
    }
  },

  getStories: (req, res) => {
    userService.getStories(req, res, data => {
      return res.json(data)
    })
  },

  getCurrentUser: (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      introduction: req.user.introduction,
      isAdmin: req.user.isAdmin,
      clappedPostId: req.user.Claps.map(d => d.PostId),
      bookmarkedPostId: req.user.Bookmarks.map(d => d.PostId),
      followingUserId: req.user.Followings.map(d => d.id),
      followerUserId: req.user.Followers.map(d => d.id)
    })
  },

  getUser: (req, res) => {
    userService.getUser(req, res, data => {
      return res.json(data)
    })
  },
  getClaps: (req, res) => {
    userService.getClaps(req, res, data => {
      return res.json(data)
    })
  },
  getHighlights: (req, res) => {
    userService.getHighlights(req, res, data => {
      return res.json(data)
    })
  },

  getResponses: (req, res) => {
    userService.getResponses(req, res, data => {
      return res.json(data)
    })
  },

  putUser: (req, res) => {
    userService.putUser(req, res, data => {
      return res.json(data)
    })
  },

  addFollowing: (req, res) => {
    userService.addFollowing(req, res, data => {
      return res.json(data)
    })
  },

  deleteFollowing: (req, res) => {
    userService.deleteFollowing(req, res, data => {
      return res.json(data)
    })
  },

  getFollowings: (req, res) => {
    userService.getFollowings(req, res, data => {
      return res.json(data)
    })
  },

  getFollowers: (req, res) => {
    userService.getFollowers(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = userController
