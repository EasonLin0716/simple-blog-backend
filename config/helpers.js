const helpers = {
  getMonthDay: formatTime => {
    const month = formatTime.slice(4, 7)
    const day = formatTime.slice(8, 10)
    return `${month} ${day}`
  },
  getReadTime: content => {
    const readTime = Math.ceil(content.length / 400)
    return readTime === 1 ? `1 min read` : `${readTime} mins read`
  },
  // for handlebars
  ifEqual: function(a, b, options) {
    if (a === b) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  },
  ifNotEqual: function(a, b, options) {
    if (a !== b) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  }
}

module.exports = helpers
