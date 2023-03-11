const {Model,DataTypes} = require('sequelize')

const {sequelize} = require('../util/db')


//database structure/model, used for querying the postgres DB

class Info extends Model{}
Info.init({
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    statistic: {
        type:DataTypes.TEXT,
    },
    value:{
        type:DataTypes.INTEGER,
    }
    },
    {
        sequelize,
        underscored:true,
        timestamps:false,
        modelName:'Info'
    })

module.exports =Info
 