if (process.env.NODE_ENV !== 'production') {
    // require('dotenv').load() // A l'origine
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/mybrary', {
mongoose.connect(process.env.DATABASE_URLL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// mongoose.connect('mongodb://localhost/mybrary', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log('MongoDB Connected...'))
//     .catch((err) => console.log(err))

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000) 