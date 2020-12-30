const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator')
const User = require('../models/User');
const gravatarUrl = require('gravatar-url');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//@route api/auth
//@route post
router.post("/",
[
check('name','Name field is required').not().isEmpty(),
check('email','Email is not valid').isEmail(),
check('password','Please enter atleast 6 characters').isLength({min:6})
],
async (req,res)=>{
    console.log(req.body)
    //check request body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password} = req.body;
    try{
        //Check if email exists
        let user = await User.findOne({email});
        if(user!==null){
            return res.status(400).json({errors:[{msg:'User already exists'}]});
        }

        var avatar = gravatarUrl(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });

        user = new User({
            name,
            email,
            password,
            avatar
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload = {
            user:{
            id:user.id
            }
        }
        //JWT return token
        await jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:3600
        },(err,token)=>{
            if(err){
                res.status(500).json({msg:'Jwt Server error'})
            }
            res.status(200).send(token);
        });

    }catch(err){
        res.status(500).send('Server Error');
        console.log(err.message);
    }

});


module.exports=router;