require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect:'postgres',
    protocol:'postgres',
    dialectOptions:{
        
    },
})


const main = async ()=>{
    try{
        await sequelize.authenticate()
        const story = "story"
        const distance = await sequelize.query('SELECT story FROM :mytable ',{replacements:{mytable:DISTANCE},type: QueryTypes.SELECT})
        console.log(distance[0].exact_count)
        sequelize.close()
    } catch (error){
        console.error('Unable to connect to the database:',error)
    }
}

main()