import { combineReducers } from "redux";

import formReducer from "./form.js";
import learnReducer from "./learn.js";
import loginReducer from "./login.js";
import settingReducer from "./setting.js";
import tableReducer from "./table.js";

const allReducers = combineReducers({
  login: loginReducer,
  setting: settingReducer,
  form: formReducer,
  table: tableReducer,
  learn: learnReducer,
});

export default allReducers;
