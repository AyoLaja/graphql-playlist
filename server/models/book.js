const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: String, 
    genre: String,
    authorId: String
})

//Model is a collection in the database
//The collection will have objects inside it (bookSchema)
module.exports = mongoose.model('Book', bookSchema)