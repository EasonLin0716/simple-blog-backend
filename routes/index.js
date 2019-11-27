const postController = require('../controllers/postController')

module.exports = app => {
  app.get('/', postController.getPosts)
}
