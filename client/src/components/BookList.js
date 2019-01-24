import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'

//Components 
import BookDetails from './BookDetails'

class BookList extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            selected: null
        }

        // this.handleListItemClick = this.handleListItemClick.bind(this)
    }

    // handleListItemClick(event) {
    //     this.setState({
    //         selected: event.target
    //     })
    // }

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
                    <li key={book.id} onClick={() => { this.setState({ selected: book.id })}}>{book.name}</li>
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
                <BookDetails bookId={this.state.selected}/>
            </div>
        );
    }
}

//Binding query to component
//Now component has access to data being sent form query
//Data stored in component props
export default graphql(getBooksQuery)(BookList);
