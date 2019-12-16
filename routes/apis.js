const express = require('express')
const router = express.Router()

const postController = require('../controllers/apis/postController')
const replyController = require('../controllers/apis/replyController')
const userController = require('../controllers/apis/userController')

router.get('/', (req, res) => res.redirect('/apis/posts'))
router.post('/signin', userController.signIn)
router.get('/posts', postController.getPosts)
router.get('/posts/:id', postController.getPost)
router.get('/posts/:id/replies', replyController.getReplies)
router.post('/posts/:id/reply', replyController.postReply)
router.delete('/posts/:id/replies/:reply_id', replyController.deleteReply)

module.exports = router
