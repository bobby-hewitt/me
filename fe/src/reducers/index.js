import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import setup from './setup'
import homepage from './homepage'

export default combineReducers({
  routing: routerReducer,
  setup,
  homepage,
  counter 
}) 