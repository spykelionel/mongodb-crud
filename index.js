const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config();

const port = process.env.PORT || 3000

const server = http.createServer(app)

const uri = process.env.HOST;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}, (err)=>{
    if(err){
        console.log("Couldn't connnect mongodb")
        console.error(err?.stack)
        
    } else {
        console.log("Connected successsfully to mongodb")
    }
})

server.listen(port, (err)=>{
    if(err){
        console.error(err, "couldn't connect to", port)
    }
    console.clear();
    console.log("Server is running at", port)
    // console.log(new  Date().toISOString())
})