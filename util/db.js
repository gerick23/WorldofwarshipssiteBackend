const Sequelize = require('sequelize')
const { DATABASE_URL, PORT } = require('./config');

const sequelize = new Sequelize(DATABASE_URL,{
    dialect:'postgres',
    protocol:'postgres',
});

const connectToDatabase = async ()=>{
    try{
        await sequelize.authenticate();
        console.log('connected to the database')
        console.log(PORT)
    }catch(error){
        console.log('failed to connect to the database')
        return process.exit(1)
    }
    return null;
}

module.exports = {connectToDatabase,sequelize}