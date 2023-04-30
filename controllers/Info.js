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

        const user = await User.findOne({where:{username:req.decodedToken.username}})
        console.log("user",user)
        const stat = await Info.create({...req.body,userId:user.id})
        console.log(stat)
        res.json(stat)
    }catch(error){
        console.log(error)
        return res.status(400).json({error})
    }


})

router.get('/:statistic/', async(req,res)=>{
    const returnedstat = await Info.findAll({where:{statistic:req.params.statistic}})
    if(returnedstat){
        res.json(returnedstat)
    }else{
        res.status(404).end()
    }
})
router.get('/:statistic/:value', async (req,res)=>{
    const returnvalue = await Info.findAll({where:{statistic:req.params.statistic,value:Number(req.params.value)}})
    if(returnvalue){
        return res.json(returnvalue);
    }else{
        return NULL
    }
})
router.delete('/:statistic/:value',async(req,res,next)=>{
    try{
        await Info.destroy({where:{statistic:req.params.statistic,value:Number(req.params.value)}})
        res.status(204).end()
    }catch(error){
        next(error)
    }
})
module.exports = router
