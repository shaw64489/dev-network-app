import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

//takes in initial state and action
export default function(state = initialState, action) {
  //test with switch
  //action is object with type
  switch (action.type) {
    //payload includes errors object
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    //default returns state as is
    default:
      return state;
  }
}
