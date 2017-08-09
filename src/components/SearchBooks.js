import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import RenderBook from "./RenderBook.js";


class SearchBooks extends Component {

  state = { query: "", searchResults: [], booksCollection: []}

  updateBookQuery = (event) => {
    const query = event.target.value.trim()
    this.setState({ query:  query }, this.searchBooks(query));
  }

  componentDidMount = () => {
    this.setState({
      booksCollection: this.props.books
    })
  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query.trim()).then(books => {
      if (books) {
        this.setState({searchResults: this.checkForShelfState(books, this.props.books)})
      } else {
        this.setState({searchResults: []})
      }
    })
    } else {
      this.setState({searchResults: []})
    }
  }

  checkForShelfState(searchResults, booksCollection) {
    var results = []
    searchResults.map(book => {
      booksCollection.map(shelvedBook =>  {
        if (book.id === shelvedBook.id) {
          book.shelf = shelvedBook.shelf
        }
        return null
      })
      results.push(book)
      return null
    })
    return results
  }

  

  render() {

    const { onChange, shelfOptions } = this.props
    const { searchResults } = this.state
    const { updateBookQuery } = this

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
             Close 
          </Link>
          <div className="search-books-input-wrapper">
          <input
            name="title"
            type="text"
            placeholder="Search by title or author"
            onChange={event => updateBookQuery(event)}
          />
        </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
          { searchResults && searchResults.length > 0 &&
            searchResults.map(book => <RenderBook 
              key={book.id} 
              book={book}
              onChange={event => onChange(event, book.id)}
              shelfOptions={shelfOptions}
              />)
          }
        </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

