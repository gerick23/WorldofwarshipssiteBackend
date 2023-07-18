const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { NUMBER } = require('sequelize');
const { Info } = require('../models')
const { User } = require('../models');


const getTokenFrom = (req,res,next) =>{
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        try{
            console.log(authorization.substring(7))
            req.decodedToken = jwt.verify(authorization.substring(7),process.env.SECRET)
            console.log("wtf",req.decodedToken)
        }catch{
            return res.status(401).json({error:'token invalid'})
        }
    }else{
        return res.status(401).json({error:'token missing'})
    }
    next()
}
router.get('/', async (req,res)=>{
    const statistics = await Info.findAll({
        attributes:{exclude:['user_id']},
        include:{
            model:User,
            attributes:['name']
        }
    })
    res.json(statistics)
})

router.post('/',getTokenFrom, async(req,res)=>{
    try{
        console.log(req.body)
        const user = await User.findOne({where:{username:req.decodedToken.username}})
        console.log("user",user)
        const stat = await Info.create({...req.body,userId:user.id})
        console.log(stat)
        res.json(stat)
    }catch(error){
        console.log("error",error)
        return res.status(400).json({error})
    }


})
router.delete('/',async(req,res,next)=>{
    try{
        const user = await User.findOne({where:{username:req.decodedToken.username}})
        await Info.destroy({where:{userId:user.userId}})
        res.status(204).end()
    }catch(error){
        next(error)
    }
})
module.exports = router
