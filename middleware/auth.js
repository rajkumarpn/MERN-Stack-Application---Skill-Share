const jwt = require('jsonwebtoken');
require('dotenv').config();

//Authenticate routes
const auth = (req,res,next) =>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:'Not authorized'});
    }
    try{
        const user = jwt.verify(token,process.env.SECRET_KEY);
        if(!user){
            return res.status(401).json({msg:'Token not valid'});
        }
        req.user = user.user;
        next();
    }catch(error){
        console.log(error.message);
        res.status(401).json({msg:'Not authorized'})
    }

}

module.exports = auth;