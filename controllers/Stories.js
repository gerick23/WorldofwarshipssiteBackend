const Router = require('express').Router()

const { Stories } = require('../models')



Router.get('/',async (req,res)=>{
    try{
    const numberofstories = await Stories.count();
    let idvalue = Math.floor((Math.random() * numberofstories) + 1);
    console.log(numberofstories)
    const story =await Stories.findAll({
        where:{
            id:idvalue
        }
    })
    res.json(story)
    console.log({story})
    }catch(error){
        console.log(error)
    }
})


Router.post('/',async (req,res)=>{
    try{
        const story = await Stories.create({stories:req.body.body});
        console.log(req.body)
        res.json(story)
    } catch (error){
        //console.log(req.body)
        return res.status(400).json({error})
    }
})

module.exports = Router


