import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import fighterReducer from './fighterReducer'


export default (history) => combineReducers({
    router: connectRouter(history),
    // more reducers here
    fighterReducer,
  })