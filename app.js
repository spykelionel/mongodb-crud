const express = require('express')
const morgan = require('morgan')
const todoRoutes = require('./routes/todo.routes')
const path = require('path');

const app = express()

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/todo', todoRoutes)
app.get('/', (req,res)=>res.send("Your todo app is running. navigate to /todo"))

// handle route errors here
app.use(identifyError,handleError)

function identifyError(req,res,next){
    const err = new Error("Endpoint Not Found")
    err.status = 404
    next(err)
}
function handleError(err,req,res){
    res.status(err.status || 500).json({
       error: {
            message: err.message || "endpoint not found",
            statusCode: err.status || 500,
            redirect: true,
            to: process.env.HOST
       }
    })
}


module.exports = app;