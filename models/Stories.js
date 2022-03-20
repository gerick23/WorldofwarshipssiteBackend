const {Model,DataTypes} = require('sequelize')

const {sequelize} = require('../util/db')


//database structure/model, used for querying the postgres DB

class Stories extends Model{}
Stories.init({
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    stories: {
        type:DataTypes.TEXT,
    },
    title:{
        type:DataTypes.TEXT,
    }
    },
    {
        sequelize,
        underscored:true,
        timestamps:false,
        modelName:'Stories'
    })

module.exports =Stories
 