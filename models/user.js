const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String
    },email:{
        type:String,
        unique:true
    },password:{
        type:String
    },profileUrl:{
        type:String,
        default:'/public/images/user.png'
    }
},{timestamps:true})




const user = mongoose.model('user',userSchema)

module.exports = user;

