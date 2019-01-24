import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'

class BookList extends Component {
    displayBooks() {
        var data = this.props.data

        if (data.loading) {
            return (
                <div>Loadding books...</div>
            )
        }
        else {
            return data.books.map(book => {
                return (
                    <li key={book.id}>{book.name}</li>
                )
            })
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <ul id="book-list">
                    <li>Book name</li>
                    {this.displayBooks()}
                </ul>
            </div>
        );
    }
}

//Binding query to component
//Now component has access to data being sent form query
//Data stored in component props
export default graphql(getBooksQuery)(BookList);
