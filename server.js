const express = require('express')
const app = express();
const mongoose = require('mongoose')

const staticRouter = require('./routes/staticRoute')

const path = require('path');
const cookieParser = require('cookie-parser');
const blog = require('./routes/blog')
const blogSchema = require('./models/blog')
const {restrictUser} = require('./securitya/auth')
require('dotenv').config();

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve('./public')))

mongoose
.connect(process.env.url)
.then(()=>{console.log('database is connected')})
.catch((err)=>{console.log(err)})

app.use('/',staticRouter);
app.use('/',blog)


app.listen(process.env.PORT,()=>{
    console.log('server is connected')
})