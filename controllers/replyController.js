const replyController = {
  clap: (req, res) => {
    return res.send('POST 新增一次鼓掌')
  },

  unClap: (req, res) => {
    return res.send('POST 撤回一次鼓掌')
  },

  addReply: (req, res) => {
    return res.send('POST 新增一則回覆')
  },

  deleteReply: (req, res) => {
    return res.send('DELETE 刪除一則回覆')
  },

  addBookmark: (req, res) => {
    return res.send('POST 新增一個書籤')
  },

  deleteBookmark: (req, res) => {
    return res.send('DELETE 刪除一個書籤')
  }
}

module.exports = replyController
