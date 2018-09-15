import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

//Register User
//history is - this.props.history from Register component
export const registerUser = (userData, history) => dispatch => {
  //post to register users api
  //second parameter - user data
  //get and log res data
  //set error state to returned error
  axios
    .post('/api/users/register', userData)
    //redirect on success
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - GET User token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      //set token to local storage
      //only stores strings
      localStorage.setItem('jwtToken', token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    //set error state to returned error
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //Remove token from local storage
  localStorage.removeItem('jwtToken');
  //Remove auth header for future request
  setAuthToken(false);
  //Set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
