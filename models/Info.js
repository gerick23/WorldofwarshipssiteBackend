const {Model,DataTypes} = require('sequelize')

const { sequelize } = require('../util/db')


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
        allowNull: false,
    },
    value:{
        type:DataTypes.INTEGER,
        allowNull: false,
    }
    },
    {
        sequelize,
        underscored:true,
        timestamps:true,
        modelName:'Info'
    })

module.exports =Info
 