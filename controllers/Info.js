const router = require('express').Router()
const { NUMBER } = require('sequelize');
const { Info } = require('../models')


router.get('/', async (req,res)=>{
    const statistics = await Info.findAll()
    res.json(statistics)
})

router.post('/', async(req,res)=>{
    try{
        const stat = await Info.create(req.body)
        res.json(stat)
    }catch(error){
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
