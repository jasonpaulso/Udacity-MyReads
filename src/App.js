import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooksOnShelf from './components/ListBooksOnShelf'
import SearchBooks from './components/SearchBooks'


class App extends Component {

  state = {
    books: [],
    shelfOptions: [
        {
          name: 'Move to...',
          shelfValue: "moveTo",
          disabled: true
        },
        {
          name: 'Currently Reading',
          shelfValue: 'currentlyReading'
        },
        {
          name: 'Want to Read',
          shelfValue: 'wantToRead'
        },
        {
          name: 'Read',
          shelfValue: 'read'
        }
      ]
  }

  componentDidMount() {
    this.updateBookShelf()
  }

  updateBookShelf = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books:books})
    })
  }

  render() {

    const { updateBookShelf } = this
    const { shelfOptions, books } = this.state
  
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListBooksOnShelf
            books={books}
            onChange={updateBookShelf} 
            shelfOptions={shelfOptions}
          />
        )}/>
        <Route path='/search' render={({history}) => (
          <SearchBooks
            books={books}
            onChange={updateBookShelf}
            shelfOptions={shelfOptions}
          />
        )}/>
      </div>
    )
  }
}

export default App;

