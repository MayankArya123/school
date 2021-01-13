const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
//dotenv.config({path:'./Config/.env'})

const {MONGO_URI} = require('./Config/keys')


 mongoose.connect(MONGO_URI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true, useFindAndModify: false})

 const connection = mongoose.connection

connection.once('open',()=>{
 console.log("Mongodb database connection established")
})


 const app = express()

  app.use(cors())
  app.use(express.json())
  app.use('/Student',require('./Routes/Student'))
  app.use('/Teacher',require('./Routes/Teacher'))

  
if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'))

    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


 const port= process.env.PORT || 8000

 app.listen(port,console.log(`server running at ${port}`))
