import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

//pass object with reducers
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
