import { gql } from 'apollo-boost'

//Query construction
export const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

export const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`
//$name... are query variables
//! indicates non-null
export const addBookMutation = gql`
    mutation($name:String!, $genre:String!, $authorId:ID!) {
        addBook (name: $name, genre: $genre, authorId: $authorId) {
            name
            id
        }
    }
`