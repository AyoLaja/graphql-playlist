const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: String, 
    age: Number
})

//Model is a collection in the database
//The collection will have objects inside it (bookSchema)
module.exports = mongoose.model('Author', authorSchema)