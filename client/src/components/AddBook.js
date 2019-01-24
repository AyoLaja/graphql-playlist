import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'

//Queries
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    displayAuthors() {
        //Data is attached to this.props when query is binded to component
        var data = this.props.getAuthorsQuery

        if (data.loading) {
            return (
                <option disabled>Loading authors...</option>
            )
        }
        else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        // console.log(this.state)
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
    } 

    render() {
        // console.log(this.props)
        return (
            <form id="add-book" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" name="name" onChange={this.handleChange}></input>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" name="genre" onChange={this.handleChange}></input>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={this.handleChange} name="authorId">
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        );
    }
}

//Binding query to component
//Now component has access to data being sent form query
//Data stored in component props
export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);