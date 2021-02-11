const express = require('express')
const expressLayouts = require('express-ejs-layouts')
 
const app = express()

const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://shop2:shop2@shop2.c7npm.mongodb.net/shop2?retryWrites=true&w=majority'
mongoose.connect(mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true    
})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('connected'))

app.use('/',indexRouter)

app.listen(process.env.PORT || 3002)