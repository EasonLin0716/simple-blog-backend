const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const replyController = require('../controllers/replyController')
const userController = require('../controllers/userController')
const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/signin')
}
const authenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next()
    }
    return res.redirect('/')
  }
  res.redirect('/signin')
}

router.get('/', (req, res) => {
  res.redirect('/posts')
})

/* 註冊及登入 */

router.get('/signin', userController.signInPage)
router.post(
  '/signin',
  passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true
  }),
  userController.signIn
)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

/* POST相關 */

router.get('/posts', postController.getPosts)
router.get('/posts/create', authenticated, postController.createPost)
router.get('/posts/:id', postController.getPost)
router.post('/posts', postController.addPost)
router.get('/posts/:id/edit', postController.editPost)
router.put('/posts/:id', postController.putPost)
router.delete('/posts/:id', postController.deletePost)
router.post('/posts/:id/clap', authenticated, replyController.clap)
router.post('/posts/:id/unclap', authenticated, replyController.unClap)
router.get('/posts/:id/replies', replyController.getReplies)
router.post('/posts/:id/reply', authenticated, replyController.postReply)
router.delete('/posts/:id/replies/:reply_id', replyController.deleteReply)
router.post('/posts/:id/bookmark', authenticated, replyController.addBookmark)
router.delete('/posts/:id/bookmark', replyController.deleteBookmark)

/* 使用者 */

router.get('/users/:id', userController.getUser)
router.get('/users/:id/edit', userController.editUser)
router.get('/users/:id/claps', userController.getClaps)
router.get('/users/:id/highlights', userController.getHighlights)
router.get('/users/:id/responses', userController.getResponses)
router.post('/users/:id/follow', authenticated, userController.addFollowing)
router.delete(
  '/users/:id/follow',
  authenticated,
  userController.deleteFollowing
)
router.get('/users/:id/followers', userController.getFollowers)
router.get('/users/:id/followings', userController.getFollowings)

module.exports = router
