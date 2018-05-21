import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import setup from './setup'
import homepage from './homepage'
import ui from './ui'
export default combineReducers({
  routing: routerReducer,
  ui,
  setup,
  homepage,
  counter 
}) 