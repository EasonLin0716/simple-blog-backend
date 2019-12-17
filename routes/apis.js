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
router.get('/posts', postController.getPosts)
router.get('/posts/:id', postController.getPost)
router.get('/posts/:id/replies', replyController.getReplies)
router.post('/posts/:id/reply', replyController.postReply)
router.delete(
  '/posts/:id/replies/:reply_id',
  authenticated,
  authenticatedAdmin,
  replyController.deleteReply
)
router.post('/posts/:id/clap', authenticated, replyController.clap)
router.post('/posts/:id/bookmark', authenticated, replyController.addBookmark)

module.exports = router
