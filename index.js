const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db');
const storiesRouter = require('./controllers/Stories')
const userRouter = require('./controllers/Users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())

//server configuration, fairly basic
app.use('/', storiesRouter)
app.use('/',userRouter)
app.use('/',loginRouter)

const start = async ()=>{
    await connectToDatabase()
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    })
}

start()