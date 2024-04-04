import { combineReducers } from 'redux';
import {counterReducer} from './counterReducer';

// export default combineReducers({
//     counterReducer,
// })

const rootReducer = combineReducers({
     counterReducer: counterReducer
    //countState: counterReducer || (() => null)
  })
  
  export default rootReducer
  