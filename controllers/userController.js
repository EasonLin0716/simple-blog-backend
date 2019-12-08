const bcrypt = require('bcryptjs')
const helpers = require('../config/helpers')
const db = require('../models')
const User = db.User
const Post = db.Post
const Reply = db.Reply
const Followship = db.Followship
const { Op } = (sequelize = require('sequelize'))

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
    return User.findByPk(req.params.id, {
      include: [Post, { model: User, as: 'Followers' }]
    }).then(user => {
      user.Posts.map(post => {
        post.monthDay = helpers.getMonthDay(String(post.createdAt))
      })
      if (req.user) {
        user.isFollowing = user.Followers.map(user => user.id).includes(
          req.user.id
        )
      }
      return res.render('user/profile', {
        user,
        posts: user.Posts,
        currentUser: req.user
      })
    })
  },

  editUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      return res.render('user/edit', { user })
    })
  },

  putUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      user
        .update({
          name: req.body.name,
          introduction: req.body.introduction
        })
        .then(user => {
          res.redirect(`/users/${user.id}`)
        })
    })
  },

  addFollowing: (req, res) => {
    return Followship.create({
      followerId: req.user.id,
      followingId: +req.params.id
    }).then(() => {
      return res.redirect('back')
    })
  },

  deleteFollowing: (req, res) => {
    return Followship.destroy({
      where: {
        followerId: req.user.id,
        followingId: +req.params.id
      }
    }).then(() => {
      return res.redirect('back')
    })
  },

  getFollowings: (req, res) => {
    return res.render('user/followings')
  },

  getFollowers: (req, res) => {
    return res.render('user/followers')
  }
}

module.exports = userController
