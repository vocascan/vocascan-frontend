import React from "react";
import ReactDOM from "react-dom";
import App from "App.jsx";
import { Provider } from "react-redux";
import store from "redux/Store/index";
import I18nProvider from "i18n/I18nProvider";
import reportWebVitals from "reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
