require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())


const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect:'postgres',
    protocol:'postgres',
    dialectOptions:{
        
    },
})

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

app.get('/:name', async(req,res)=>{
    //get length of wanted column, then pick a random story from said column.
    try{
        const length = await sequelize.query("SELECT count(*) FROM stories.column",{replacements:{column:distance},type:QueryTypes.SELECT})
        console.log(length)
    }catch(error){
        console.log(error)
    }
    try{
        const randomnumber = randomIntFromInterval(1,length);
        const story = await sequelize.query("SELECT Distance FROM stories WHERE id=?",{replacements:[1],type: QueryTypes.SELECT})
        console.log(story)
        return res.json(story)
    }catch(error){
        return res.status(404).json({error})
    }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})