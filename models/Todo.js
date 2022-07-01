const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: String,
    description: String
}, {timestamps:true})

const Todo = mongoose.model("Todo", todoSchema);
module.exports = User;