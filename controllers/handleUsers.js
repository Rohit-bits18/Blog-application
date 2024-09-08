const user = require('./../models/user')
const {setToken} = require('./../securitya/auth')

async function SignIn(req,res){
    const {name,email,password} = req.body;

    const result = await user.create({
        name,email,password
    })

    if(!result){ return res.redirect('/signin')}
    console.log(result);

   return res.redirect('/login')
}

async function Login(req,res){
    const body = req.body;
    const { email, password } = req.body;

    let result 
    try {
        
         result = await user.findOne({ email });
        
       
        if (!result) {
            return res.redirect('/signin');
        }

      
       
    }catch(err){
            console.log(err)
        }

    const token = setToken(result);


    res.cookie("uid",token);

   return res.redirect('/home')

}

module.exports={
    SignIn,Login
}