const Info = require('./Info')
const User = require('./users')
Info.sync()


User.hasMany(Info)
Info.belongsTo(User)
Info.sync({alter:true})
User.sync({alter:true})
module.exports = {
    Info,User
}