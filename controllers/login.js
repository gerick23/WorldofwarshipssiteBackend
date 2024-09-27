 require('dotenv').config()
 const hasher = require('../util/hasher')
 const jwt =require('jsonwebtoken')
 const router = require('express').Router()
    const bcrypt = require('bcrypt')
 const User = require('../models/users')

 const saltrounds = 10
 router.post('/', async(request,response)=>{
    const body = request.body
    // console.log(request.body) // Removed to avoid logging sensitive information
    const user = await User.findOne({
        where:{
            username:body.username,
        }
    });
    // console.log(user) // Removed to avoid logging sensitive information
    const passwordcorrect = user===null? false: await bcrypt.compare(body.password,user.hashedpassword);
    // console.log(passwordcorrect) // Removed to avoid logging sensitive information
    if(!(user && passwordcorrect)){
        return response.status(401).json({
            error:'invalid username or password'
        })
    }

    const userForToken = {
        username:user.username,
        passord:user.hashedpassword,
    }
    const token = jwt.sign(userForToken,process.env.SECRET,{expiresIn:60*60})
    // console.log(token) // Removed to avoid logging sensitive information
    return response
        .status(200)
        .send({token,username:user.username})
 })

 module.exports = router
