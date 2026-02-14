import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { thunk } from 'redux-thunk'
import clientReducer from './reducers/clientReducer'
import productReducer from './reducers/productReducer'
import shoppingCartReducer from './reducers/shoppingCartReducer'

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
})

const logger = createLogger({ collapsed: true })

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store

