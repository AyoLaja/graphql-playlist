const graphql = require('graphql')
const _ = require('lodash')

//Defining object types
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql

//Dummy data 
var books = [
    {name: 'Book 1', genre: 'Fantasy 1', id: '1'},
    {name: 'Book 2', genre: 'Fantasy 2', id: '2'},
    {name: 'Book 3', genre: 'Fantasy 3', id: '3'}
]

var authors = [
    {name: 'Author 1', age: 21, id: '1', authorID: '1'},
    {name: 'Author 2', age: 52, id: '2', authorID: '2'},
    {name: 'Author 3', age: 43, id: '3', authorID: '3'}
]

//Object will define what a book is all about
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType, 
            resolve(parent, args) {
                console.log(parent)
                return _.find(authors, { id: parent.authorID})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        age: { type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID}
            },
            resolve(parent, args) {
                //Code to get data from db or other sources
                console.log(typeof args.id)
                //Second param determines how we find a particular book
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            arg: {
                id: { type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        }
    }
})

// book(id: "2"){
//     name
//     genre
// }

module.exports = new GraphQLSchema({
    query: RootQuery
})