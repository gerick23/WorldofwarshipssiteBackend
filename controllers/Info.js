const router = require('express').Router()
const { Info } = require('../models')


const statFinder = async (req,res,next) => {
    req.info = await Info.findByPk(req.params.id)
    next();
}
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

router.get('/:id', async(req,res)=>{
    if(req.info){
        res.json(req.info)
    }else{
        res.status(404).end()
    }
})

router.delete('/:id',async(req,res)=>{
    if(req.info){
        await req.info.destroy()
    }
    res.status(204).end()
})
module.exports = router
