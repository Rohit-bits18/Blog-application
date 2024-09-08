const express = require('express')
const router = express.Router();
const {getToken} = require('./../securitya/auth')
const user = require('./../models/user')


const {SignIn,Login} = require('./../controllers/handleUsers')



const {restrictUser} = require('./../securitya/auth');
const blog = require('./../models/blog');

router.get('/home',async(req,res)=>{

    const blogCards = await blog.find({});

  if(!req.cookies?.uid){ return res.render('home',{blogs:blogCards}) }

const uid = getToken(req.cookies?.uid);

const result = await user.find({email:uid.email,password:uid.password})

return res.render('home',{blogs:blogCards,user:result})
  
})

router.get('/signin',(req,res)=>{
    res.render('signup')
})

router.get('/login',(req,res)=>{
    res.render('login')
})


router.post('/addUser',SignIn);
router.post('/login',Login)



module.exports = router;