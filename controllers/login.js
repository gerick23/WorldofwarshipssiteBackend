 import { hasher } from '../util/hasher'
 const jwt =require('jsonwebtoken')
 const router = require('express').Router()

 const User = require('../models/users')

 const saltrounds = 10
 router.post('/', async(request,response)=>{
    const body = request.body
    const potential = hasher(body.hashedpassword)
    const user = await User.findOne({
        where:{
            username:body.username,
            hashedpassword:potential,
            
        }
    })

    if(!user){
        return response.status(401).json({
            error:'invalid username or password'
        })
    }

    const userForToken = {
        username:user.username,
        passord:user.hashedpassword,
    }
    const token = jwt.sign(userForToken)
    response
        .status(200)
        .send({token,username:user.username})
 })

 module.exports = router
