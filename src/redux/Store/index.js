import { createStore } from "redux";
import storeSynchronize from "redux-localstore";

import allReducers from "../Reducers/index.js";

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__?.());

export default store;

storeSynchronize(store, {
  whitelist: ["login", "setting", "form", "table", "language"],
});
