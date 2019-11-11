import { combineReducers } from 'redux';
import { reduxTokenAuthReducer } from 'redux-token-auth';

const combinedReducers = combineReducers({
  user: {},
})

export default combinedReducers