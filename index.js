const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db');

const UsersRouter = require('./controllers/users')
const InfoRouter = require('./controllers/Info')
const LoginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())

//server/router configuration, fairly basic

app.use('/api/infos',InfoRouter);
app.use('/api/login',LoginRouter);
app.use('/api/users',UsersRouter);

const start = async ()=>{
    await connectToDatabase()
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    })
}
module.exports = app
start()