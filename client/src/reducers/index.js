import { combineReducers } from 'redux';
import authReducer from './authReducer';

//pass object with reducers
export default combineReducers({
  auth: authReducer
});
