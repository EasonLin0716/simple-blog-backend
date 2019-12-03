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
    return res.render('user/profile')
  },

  editUser: (req, res) => {
    return res.render('user/edit')
  },

  putUser: (req, res) => {
    return res.send('PUT 更新個人資訊')
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
