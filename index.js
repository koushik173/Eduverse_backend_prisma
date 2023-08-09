const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors');

require('dotenv').config()
const app = express()
app.use(cors()); 

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
 res.send("Hello From Eduverse.")
})


app.listen(5000, ()=>{
    console.log('server is running on port 5000');
})

