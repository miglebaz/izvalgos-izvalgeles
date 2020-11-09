const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// routes

const postRoutes = require('./routes/post')


const app = express()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false,
    useUnifiedTopology: true
})

.then(() => console.log('DB connect'))
.catch(err => console.log(err)); 

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

// app.get('*', (req, res)=>{
//     res.json({
//         data: 'You reached nodejs api for react node crud app change'

//     })
// })

// route middleware
app.use('/api', postRoutes);
const port = process.env.PORT || 8000

app.listen(port, ()=> console.log(`Server is running on port ${port}`))

