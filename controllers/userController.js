const db = require('../models')
const User = db.User

const userController = {
  signInPage: (req, res) => {
    return res.render('signin')
  },
  signIn: (req, res) => {
    return res.redirect('/posts')
  },
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  signUp: (req, res) => {
    return res.send('POST 註冊')
  },

  getUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      return res.render('user/profile', { user })
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
          console.log(user)
          res.redirect(`/users/${user.id}`)
        })
    })
  },

  addFollowing: (req, res) => {
    return res.send('POST 新增一個追隨')
  },

  deleteFollowing: (req, res) => {
    return res.send('DELETE 刪除一個追隨')
  },

  getFollowings: (req, res) => {
    return res.render('user/followings')
  },

  getFollowers: (req, res) => {
    return res.render('user/followers')
  }
}

module.exports = userController
