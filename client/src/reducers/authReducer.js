import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

//takes in initial state and action
export default function(state = initialState, action) {
  //test with switch
  //action is object with type
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        //return current state and isAuthenticated
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    //default returns state as is
    default:
      return state;
  }
}
