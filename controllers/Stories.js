const Router = require('express').Router()

const { Stories } = require('../models')


//Routes that return stories from the database to the frontend
Router.get('/',async (req,res)=>{
    //generates a random row to query in order to get a random story
    try{
    const numberofstories = await Stories.count();
    let idvalue = Math.floor((Math.random() * numberofstories) + 1);
    console.log(numberofstories)
    const story =await Stories.findAll({
        where:{
            id:idvalue
        }
    })
    console.log(story)
    return res.json(story)
    }catch(error){
        console.log(error)
    }
})

//post functionality possibility of being used in the future.
Router.post('/',async (req,res)=>{
    try{
        const story = await Stories.create({stories:req.body.body});
        res.json(story)
    } catch (error){
        return res.status(400).json({error})
    }
})

module.exports = Router


