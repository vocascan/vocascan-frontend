import { combineReducers } from "redux";

import loginReducer from "./login.js";
import settingReducer from "./setting.js";

const allReducers = combineReducers({
  login: loginReducer,
  setting: settingReducer,
});

export default allReducers;
