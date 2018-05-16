import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import setup from './setup'


export default combineReducers({
  routing: routerReducer,
  setup,
  counter 
}) 