const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:{
        type:String
    },body:{
        type:String,
       
    },coverimg:{
        type:String,
        default:'./../public/images/blog.png'
    },createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})




const blog = mongoose.model('blog',blogSchema)

module.exports = blog;

