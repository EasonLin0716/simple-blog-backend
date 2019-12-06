// Tue Dec 03 2019 14:51:39 GMT+0800 (GMT+08:00)
const helpers = {
  getMonthDay: formatTime => {
    const month = formatTime.slice(4, 7)
    const day = formatTime.slice(8, 10)
    return `${month} ${day}`
  }
}

module.exports = helpers
