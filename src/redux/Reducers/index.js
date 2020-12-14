import loginReducer from './login';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    login: loginReducer,
})

export default allReducers;