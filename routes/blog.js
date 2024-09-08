const express = require('express')
const router = express.Router();

const multer = require('multer')
const path = require('path');
const blog = require('../models/blog');
const comment = require('../models/comment');
const { restrictUser, getToken } = require('../securitya/auth');
const user = require('../models/user');


const storage = multer.diskStorage({
destination:function(req,file,cb){
    cb(null,path.resolve(`./public/uploads/`))
},
filename:function(req,file,cb){
    const filename = `${Date.now()}-${file.originalname}`
    cb(null,filename)
}
})

const upload = multer({storage:storage})


router.get('/addblog',restrictUser,(req,res)=>{
   
    return res.render('AddBlog',{user:req.user})
})



router.post('/addblog',upload.single('coverimg'),async(req,res)=>{

 const body = req.body;



const imgName = req.file.filename;
const result = await blog.create({
    title:body.title,
    body:body.body,
    coverimg:`/uploads/${imgName}`,
  
})


return res.redirect('/home')
});


router.get('/view/:id',async(req,res)=>{

 if(req.cookies?.uid){
    const  viewBlog = await blog.findById(req.params.id);


    const {email,password} = getToken(req.cookies?.uid);
     

    
      const visiter = await user.find({email,password})

     const  Comments  = await comment.find({blogId:req.params.id})
    
        if(!viewBlog){ return res.redirect('/home')}
    
       return res.render('Readblog',{
        user:visiter,
        blog:viewBlog,
        comment:Comments
       })
 }else{
    const  viewBlog = await blog.findById(req.params.id);


     const  Comments  = await comment.find({blogId:req.params.id})
    
        if(!viewBlog){ return res.redirect('/home')}
    
    
    
    
       return res.render('Readblog',{
       user:null,
        blog:viewBlog,
        comment:Comments
       })
 }  
 
 

})

router.post('/view/:id',async (req,res)=>{
    const body = req.body;
    console.log(body)

    const result = await comment.create({
        user:body.name,
        comment:body.comment,
        blogId:req.params.id
    })


    

    return res.redirect(`/view/${req.params.id}`)
})


module.exports = router;