const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

//Connect to mLab database
mongoose.connect('mongodb://username:password@ds161794.mlab.com:61794/graphql-playlist', {useNewUrlParser: true})
//Once coonection is open, fire callback function
mongoose.connection.once('open', () => {
    console.log('Connection to mongoDB instance on mLab successful')
})

//Using graphqlHTTP as middleware
//graphqlHTTP function will fire and handle all graphql requests
//When we got to /qraphql, we want to use to graphiql tool to handle tge request
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Now listening for req on port 4000')
})
