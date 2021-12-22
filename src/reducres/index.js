import {combineReducers} from 'redux'
import todos from './tasks'

const rootReducer = combineReducers({
  todos
})

export default rootReducer;