const blogController = require('../controllers/blogController')

module.exports = app => {
  app.get('/', blogController.getBlogs)
}
