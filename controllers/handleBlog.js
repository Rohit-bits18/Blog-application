
const user = require('../models/user');
const blog = require('./../models/blog')
const {getToken} = require('./../securitya/auth')

async function AddBlog(req,res){
    const body= req.body;

    const {email,password} = getToken(req.cookies?.uid);

    const createdUser  = await user.find({email,password})

    console.log(body)
    console.log(createdUser)
    const result = await blog.create({
        title:body.title,
        body:body.body,
        coverimg:body.coverimg,
        createdby:createdUser._id
    })
console.log(result )

   return res.redirect('/home')
}




module.exports={
  AddBlog
}