const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const postController = require('../controllers/apis/postController')
const replyController = require('../controllers/apis/replyController')
const userController = require('../controllers/apis/userController')

const authenticated = passport.authenticate('jwt', { session: false })
const authenticatedAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) {
      return next()
    }
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}

router.get('/', (req, res) => res.redirect('/apis/posts'))
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)
router.get('/get_current_user', authenticated, userController.getCurrentUser)
router.get('/posts', postController.getPosts)
router.get('/posts/:id', postController.getPost)
router.get('/posts/:id/replies', replyController.getReplies)
router.post('/posts/reply', replyController.postReply)
router.delete(
  '/posts/:id/replies/:reply_id',
  authenticated,
  authenticatedAdmin,
  replyController.deleteReply
)
router.post('/posts/:id/clap', authenticated, replyController.clap)
router.post('/posts/:id/bookmark', authenticated, replyController.addBookmark)
router.delete(
  '/posts/:id/bookmark',
  authenticated,
  replyController.deleteBookmark
)
router.post(
  '/posts',
  //authenticated,
  postController.addPost
)
router.put('/posts/:id', postController.putPost)
router.delete('/posts/:id', authenticated, postController.deletePost)

router.get('/users/:id', userController.getUser)
router.get('/users/:id/claps', userController.getClaps)
router.get('/users/:id/highlights', userController.getHighlights)
router.get('/users/:id/responses', userController.getResponses)
router.put('/users/:id', userController.putUser)
router.post('/users/:id/follow', authenticated, userController.addFollowing)
router.delete(
  '/users/:id/follow',
  authenticated,
  userController.deleteFollowing
)
router.get('/users/:id/followers', userController.getFollowers)
router.get('/users/:id/followings', userController.getFollowings)

module.exports = router
