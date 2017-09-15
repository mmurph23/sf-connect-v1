import STATE from './stateReducer';
import {combineReducers} from 'redux';
import counter from '../modules/counter';

const rootReducer = combineReducers({
  STATE,
  counter
});

export default rootReducer;
