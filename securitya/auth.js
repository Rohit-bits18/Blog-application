const jwt = require('jsonwebtoken')
const secret = "hello hi i am raya"
 function setToken(user){
   const Payload = {
      email:user.email,
      password:user.password,
   }
    return jwt.sign( Payload,secret);
}


 function getToken(token){

    if(!token) { return null; }

    return jwt.verify(token,secret);
}


 function restrictUser (req,res,next){
    const token = req.cookies?.uid

    if(!token){ return res.redirect('/login')}

    const uid = getToken(token)

    
    if(!uid){ return res.redirect('/login')}

    req.user = uid;
   next();


    
}

module.exports = {
    setToken,getToken,restrictUser
}

