const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user:{
       type:String
    },comment:{
        type:String,
       
    },blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    }
},{timestamps:true})




const comment = mongoose.model('comment',commentSchema)

module.exports = comment;

