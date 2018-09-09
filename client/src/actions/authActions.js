import axios from 'axios';
import { GET_ERRORS } from './types';

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
