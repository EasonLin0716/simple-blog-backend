const bcrypt = require('bcryptjs')
const helpers = require('../config/helpers')
const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Clap = db.Clap
const Followship = db.Followship
const { Op } = (sequelize = require('sequelize'))
const userService = require('../services/userService')

const userController = {
  signInPage: (req, res) => {
    return res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入')
    return res.redirect('/posts')
  },
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res) => {
    if (req.body.passwordCheck != req.body.password) {
      req.flash('error_messages', '兩次密碼輸入不同')
      return res.redirect('/signup')
    } else {
      const { name, email, password, passwordCheck } = req.body
      if (!name || !email || !password || !passwordCheck) {
        return req.flash('error_messages', '所有欄位皆為必填')
      }
      User.findOne({
        where: {
          [Op.or]: [{ email }, { name }]
        }
      }).then(user => {
        if (user) {
          req.flash('error_messages', '使用者名稱或信箱重複')
          return res.redirect('/signup')
        } else {
          User.create({
            name,
            email,
            password: bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(10),
              null
            ),
            avatar: 'https://fakeimg.pl/300x300/'
          }).then(user => {
            return res.redirect('/signin')
          })
        }
      })
    }
  },

  getUser: (req, res) => {
    userService.getUser(req, res, data => {
      return res.render('user/profile', data)
    })
  },

  getClaps: (req, res) => {
    userService.getClaps(req, res, data => {
      return res.render('user/claps', data)
    })
  },

  getHighlights: (req, res) => {
    userService.getHighlights(req, res, data => {
      return res.render('user/highlights', data)
    })
  },

  getResponses: (req, res) => {
    userService.getResponses(req, res, data => {
      return res.render('user/responses', data)
    })
  },

  editUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      return res.render('user/edit', { user })
    })
  },

  putUser: (req, res) => {
    userService.putUser(req, res, data => {
      return res.redirect(`/users/${data.UserId}`)
    })
  },

  addFollowing: (req, res) => {
    userService.addFollowing(req, res, data => {
      return res.redirect('back')
    })
  },

  deleteFollowing: (req, res) => {
    userService.deleteFollowing(req, res, data => {
      return res.redirect('back')
    })
  },

  getFollowings: (req, res) => {
    userService.getFollowings(req, res, data => {
      return res.render('user/followings', data)
    })
  },

  getFollowers: (req, res) => {
    userService.getFollowers(req, res, data => {
      return res.render('user/followers', data)
    })
  }
}

module.exports = userController
