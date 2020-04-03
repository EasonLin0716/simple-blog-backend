const express = require('express')
// const sassMiddleware = require('node-sass-middleware')
// const path = require('path')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const multer = require('multer')
const upload = multer()

const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const passport = require('./config/passport')

app.use(cors())

app.use(
  session({ secret: 'secret', resave: 'false', saveUninitialized: 'false' })
)
app.engine(
  'handlebars',
  handlebars({
    defaultLayout: 'main',
    helpers: require('./config/helpers')
  })
)
app.set('view engine', 'handlebars')
const srcPath = __dirname + '/scss'
const destPath = __dirname + '/public'
// app.use(
//   sassMiddleware({
//     src: srcPath,
//     dest: destPath,
//     debug: true,
//     outputStyle: 'compressed'
//   }),
//   express.static(path.join(__dirname, 'public'))
// )
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '2100000kb' }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

app.listen(port, () => {
  console.log(`app is running at ${port}`)
})

require('./routes')(app)
module.exports = app
