const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth')
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//@route GET/user details
//@route private
router.get("/",auth, async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({msg:'Server Error'});
    }

});

//@route POST /
//@desc Returns token
//@access public
router.post("/",
[
    check('email','Please enter a valid email').isEmail(),
    check('password','Password is required').exists()
],
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try{
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json([{errors:'Invalid credential'}]);
        }

        const compare =await bcrypt.compare(password,user.password);
        if(!compare){
            return res.status(400).json([{errors:'Invalid credential'}]);
        }

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:3600},(error,token)=>{
            if(error){
                res.status(500).json([{errors:'Internal error'}]);
            }
            res.status(200).json(token);
        })

    }catch(error){
        res.status(400).json([{errors:'Server Error'}]);
        console.log(error.message);
    }

})

module.exports=router;