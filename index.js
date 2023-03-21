const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db');

const InfoRouter = require('./controllers/Info')

app.use(cors())
app.use(express.json())

//server configuration, fairly basic

app.use('/api/Infos',InfoRouter);

const start = async ()=>{
    await connectToDatabase()
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    })
}
module.exports = app
start()