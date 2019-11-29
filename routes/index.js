const postController = require('../controllers/postController')

module.exports = app => {
  app.get('/', (req, res) => {
    res.redirect('/posts')
  })
  app.get('/signup', (req, res) => {
    res.send('註冊頁面')
  })
  app.post('/signup', (req, res) => {
    res.send('POST 進行註冊')
  })
  app.get('/signin', (req, res) => {
    res.send('登入頁面')
  })
  app.post('/signin', (req, res) => {
    res.send('進行登入')
  })
  app.get('/posts', postController.getPosts)
  app.get('/posts/:id', (req, res) => {
    res.send('瀏覽一篇部落格')
  })
  app.get('/posts/create', (req, res) => {
    res.send('新增部落格的頁面')
  })
  app.post('/posts', (req, res) => {
    res.send('POST 新增一篇部落格')
  })
  app.get('/posts/:id/edit', (req, res) => {
    res.send('取得更新部落格的頁面')
  })
  app.put('/posts/:id', (req, res) => {
    res.send('PUT 更新一則部落格')
  })
  app.delete('/posts/:id', (req, res) => {
    res.send('DELETE 刪除一則部落格')
  })
  app.post('/posts/:id/clap', (req, res) => {
    res.send('POST 新增一次鼓掌')
  })
  app.post('/posts/:id/unclap', (req, res) => {
    res.send('POST 撤回一次鼓掌')
  })
  app.post('/posts/:id/reply', (req, res) => {
    res.send('POST 新增一則回覆')
  })
  app.delete('/posts/:id/replies/:reply_id', (req, res) => {
    res.send('DELETE 刪除一則回覆')
  })
  app.post('/posts/:id/bookmark', (req, res) => {
    res.send('POST 新增一個書籤')
  })
  app.delete('/posts/:id/bookmark', (req, res) => {
    res.send('DELETE 刪除一個書籤')
  })
  app.get('/users/:id', (req, res) => {
    res.send('瀏覽個人資訊')
  })
  app.get('/users/:id/edit', (req, res) => {
    res.send('個人資訊編輯頁面')
  })
  app.put('/users/:id', (req, res) => {
    res.send('PUT 更新個人資訊')
  })
  app.post('/users/:id/follow', (req, res) => {
    res.send('POST 新增一個追隨')
  })
  app.delete('/users/:id/follow', (req, res) => {
    res.send('DELETE 刪除一個追隨')
  })
  app.get('/users/:id/followers', (req, res) => {
    res.send('瀏覽使用者的追隨者')
  })
  app.get('/users/:id/followings', (req, res) => {
    res.send('瀏覽使用者的追蹤者')
  })
}
