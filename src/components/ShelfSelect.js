import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";


class ShelfSelect extends Component {

  state = { shelfValue: "" }

  componentDidMount() {
    this.setState({
      shelfValue: this.props.value
    })

  }

  
  updateShelfState = (shelf) => {
    this.setState({
      shelfValue: shelf
    })
  }


  handleShelfSelect = (event, bookId) => {

    const { onChange } = this.props
    const { updateShelfState } = this

    const shelf = event.target.value.toString()

    BooksAPI.update(bookId, shelf).then(response => {
      onChange()
      updateShelfState(shelf)
    })
    

  }

  render() {

    const { shelfOptions, bookId } = this.props
    const { shelfValue } = this.state
    const { handleShelfSelect } = this
        
    const createItem = (item, key) =>

      <option
        key={key}
        value={item.shelfValue}
        disabled={item.disabled || shelfValue === item.shelfValue}
      >
        {item.name}
      </option>
    return(
      <div>
        <select id="shelf"
          value={shelfValue || "moveTo"}
          onChange={event => handleShelfSelect(event, bookId)}  
        >
          {shelfOptions.map(createItem)}

        </select>
      </div>
      )
  }
}

export default ShelfSelect



