const initialState = {
  isAuthenticated: false,
  user: {}
};

//takes in initial state and action
export default function(state = initialState, action) {
  //test with switch
  //action is object with type
  switch (action.type) {
    //default returns state as is
    default:
      return state;
  }
}
