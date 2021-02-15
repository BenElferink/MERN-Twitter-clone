import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { userReducer } from './reducers/userReducer';

export const store = createStore(
  combineReducers({
    user: userReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk, logger)),
);
