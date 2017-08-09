import React, { Component } from "react";
import ShelfSelect from "./ShelfSelect.js"

class RenderBook extends Component {


  fetchImage = (book) => {
    if (book.imageLinks) {
      return book.imageLinks.thumbnail;
    }
  }

  render() {

    const { book, shelfOptions, onChange } = this.props
    const { fetchImage } = this

    return (
      <li key={book.id} className="book">
        <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={
              {
                width: 128,
                height: 193,
                backgroundImage: `url(${fetchImage(book)})`
              }
            }
          ></div>
          <div className="book-shelf-changer">
          <ShelfSelect
          onChange={event => onChange(event)}
          shelfOptions={shelfOptions}
          bookId={book.id}
          value={book.shelf}
      />
        </div>
        </div><div className="book-title">{book.title}</div>
        <div className="book-authors">
        {(
          <span>
            {
            book.authors && book.authors.length > 0 &&
              book.authors.map((author, i) => {
                return <span key={i}>{author}</span>;
              })
          }
          </span>
        )}
      </div>
      </div>
      </li>
    )
  }

}

export default RenderBook

