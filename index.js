const cookieParser = require('cookie-parser')
const express = require('express')

require('dotenv').config()
const app = express()

//regular middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookie middleware
app.use(cookieParser())

const userRouter = require('./routes/userRoutes')
app.use('/api', userRouter)

const postRouter = require('./routes/postRoutes')
app.use('/api', postRouter)



app.get('/', (req,res)=>{
 res.send("hi from Roy")
})

app.listen(5000, ()=>{
    console.log('server is running on port 5000');
})

