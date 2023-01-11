import { getAll } from "./BooksAPI.js";
import { useState, useEffect } from 'react';
import Book from './Book.js';
import { search } from './BooksAPI.js'


function SearchPage(props) {
    const [books, setBooks] = useState({});

    return (
    <div className="search-books">
    <div className="search-books-bar">
      <a
        className="close-search"
        onClick={() => props.showSearchPageHandler(false)}
      >
        Close
      </a>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={(e) => { handleSearchResult(e.target.value, setBooks) }}
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        {
            (Object.keys(books).map((key,index) => 
              (
                <Book key={index} book={books[key]} {...props} isUpdate={false} isSearchPage={true} selectedOptionForBook={bookIsOnShelf(props, books[key])} />
              )
            ))
        }  
      </ol>
    </div>
  </div>
  );
}

async function handleSearchResult(inputValue, setBooks){
  if( inputValue == undefined || inputValue == "") {
    setBooks({})
    return
  }
  let result = await search(inputValue, 100)
  setBooks(result)
}

function bookIsOnShelf(props, currentBook) {
  var isInCurrentlyReadingList = null;
  var isInWantToReadList = null;
  var isInReadList = null;

  isInCurrentlyReadingList = props.currentlyReading.filter((book) => {
    return book.title == currentBook.title
  })

  isInWantToReadList = props.wantToRead.filter((book) => {
    return book.title == currentBook.title
  })

  isInReadList = props.read.filter((book) => {
    return book.title == currentBook.title
  })

  var shelf = "none"
  if (isInCurrentlyReadingList.length != 0) {
      shelf = "currentlyReading"
  } else if(isInWantToReadList.length != 0) {
    shelf = "wantToRead"
  } else if (isInReadList != 0) {
    shelf = "read"
  }
  return shelf
}


export default SearchPage;