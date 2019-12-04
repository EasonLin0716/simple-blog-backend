const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3000

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.listen(port, () => {
  console.log(`app is running at ${port}`)
})

require('./routes')(app)
