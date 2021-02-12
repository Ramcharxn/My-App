const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const meethodOverride = require('method-override')
 
const app = express()

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(meethodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit:'10mb', extended:false }))

const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://shop2:shop2@shop2.c7npm.mongodb.net/shop2?retryWrites=true&w=majority'
mongoose.connect(mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true    
})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('connected'))

app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)

app.listen(process.env.PORT || 3002)