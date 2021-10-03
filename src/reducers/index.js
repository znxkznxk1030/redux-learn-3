import { combineReducers } from 'redux'

import BooksReducer from './reducer-books'

const rootReducer = combineReducers({
  books: BooksReducer,
  activeBook: null,
})

export default rootReducer
