const router = require('express').Router()
const hasher = require('../util/hasher')
const  User  = require('../models/users')
const { hash } = require('bcrypt')
const { Info } = require('../models')

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
    console.log(req.body)
    const hashedpass = hasher(req.body.hashedpassword)
    console.log("hashedpass",hashedpass)
    try{
        const usernamesearch = await User.findOne({where:{username:req.body.username,hashedpassword:hashedpass}})
        if(usernamesearch){
            return res.status(400).json('Invalid Username or password')
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