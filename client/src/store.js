import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

//create var middleware set to array thunk
const middleware = [thunk];

//first param reducer
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //implement redux web tools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
