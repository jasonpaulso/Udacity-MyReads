import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import RenderBook from './RenderBook'



class ListBooksOnShelf extends Component {

  renderBook = (book) => {
    return (
        <RenderBook 
          key={book.id} 
          book={book} 
          onChange={event => this.props.onChange(event)} 
          shelfOptions={this.props.shelfOptions}
          shelf={book.shelf}
          />
      )
  }

  renderBookShelf = (category, books) => {
    if (books.length) {
      return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {
            books &&
            books.map(book => this.renderBook(book))
          }
          </ol>
        </div>
      </div>
      )
    }
    
  }

  render() {

    const { books } = this.props
    const { renderBookShelf } = this
    
    var wantToRead
    var read
    var reading

    const booksToReadFilter = new RegExp(escapeRegExp("wantToRead"))
    const booksReadFilter = new RegExp(escapeRegExp("read"))
    const booksCurrentlyReadingFilter = new RegExp(escapeRegExp("currentlyReading"))

    if (books) {
      wantToRead  = books.filter((book) => booksToReadFilter.test(book.shelf))
      read = books.filter((book) => booksReadFilter.test(book.shelf))
      reading = books.filter((book) => booksCurrentlyReadingFilter.test(book.shelf))
    }

    return (
         <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              {renderBookShelf("Currently Reading", reading)}
              {renderBookShelf("Want to Read", wantToRead)}
              {renderBookShelf("Read", read)}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className='add-book'>Add Book</Link>
            </div>
          </div>
    )
  }
}

export default ListBooksOnShelf
