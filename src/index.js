import "./config.js";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import Snackbar from "./Components/Snackbar/Snackbar.jsx";
import { SnackbarProvider } from "./context/SnackbarContext.jsx";

import I18nProvider from "./i18n/I18nProvider.js";
import store from "./redux/Store/index.js";
import reportWebVitals from "./reportWebVitals.js";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nProvider>
        <SnackbarProvider>
          <App />
          <Snackbar />
        </SnackbarProvider>
      </I18nProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
