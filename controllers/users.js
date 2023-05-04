const router = require('express').Router()
const hasher = require('../util/hasher')
const  User  = require('../models/users')
const { hash } = require('bcrypt')
const { Info } = require('../models')
const  { getPlayerNames }  = require('../helperfunctions/api_queries')
const { default: axios } = require('axios')
const playerhurl = `https://api.worldofwarships.eu/wows/account/info/?application_id=${process.env.API}&account_id`;

router.get('/',async(req,res)=>{
    const users = await User.findAll({
        include:{
            model: Info,
            attributes:{exclude:['user_id']}
        }
    })
    res.json(users)
})


router.post('/',async(req,res)=>{
    const hashedpass = hasher(req.body.hashedpassword)
    const attempt =await getPlayerNames(req.body.username);
    try{
        const usernamesearch = await User.findOne({where:{username:req.body.username}})
        if(usernamesearch || attempt.data.meta.count!=1){
            console.log("Wtf")
            return res.status(400).json('Invalid Username')
        }
        const user = await User.create({username:req.body.username,hashedpassword:hashedpass})
        res.json(user)
    }catch(error){
        return res.status(400).json({error})
    }
})

router.get('/:id',async (req,res)=>{
    const user = await User.findByPk(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404).end()
    }
})

module.exports = router


