import { combineReducers } from 'redux';
import userReducer from './userReducer';
import testReducer from './testReducer';

const rootReducer = combineReducers({
    user: userReducer,
    test: testReducer
});

export default rootReducer;