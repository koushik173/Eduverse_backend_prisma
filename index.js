const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors');
const cluster = require('node:cluster');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');
const { userPathLogger } = require('./middleware/userPathLogger')



require('dotenv').config()
const app = express()
app.use(userPathLogger);
app.use(cors());


//regular middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cookie middleware
app.use(cookieParser())



const userRouter = require('./routes/userRoutes')
app.use('/api', userRouter)

const postRouter = require('./routes/postRoutes');
app.use('/api', postRouter)

app.get('/', (req, res) => {
    return res.json({
        message: `Hello from express server ${process.pid}`
    })
})


app.listen(5000, () => {
    console.log(`Worker ${process.pid} started`);
})



