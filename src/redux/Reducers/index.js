import { combineReducers } from "redux";

import formReducer from "./form.js";
import loginReducer from "./login.js";
import settingReducer from "./setting.js";

const allReducers = combineReducers({
  login: loginReducer,
  setting: settingReducer,
  form: formReducer,
});

export default allReducers;
