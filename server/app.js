const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

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