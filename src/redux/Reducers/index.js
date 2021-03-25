import loginReducer from "./login";
import settingReducer from "./setting";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  login: loginReducer,
  setting: settingReducer,
});

export default allReducers;
