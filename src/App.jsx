import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, HashRouter, Redirect, Switch } from "react-router-dom";

import LoadingIndicator from "./Components/Indicators/LoadingIndicator/LoadingIndicator.jsx";
import AuthenticatedLayout from "./Components/Layout/AuthenticatedLayout/AuthenticatedLayout.jsx";
import CleanLayout from "./Components/Layout/CleanLayout/CleanLayout.jsx";
import Snackbar from "./Components/Snackbar/Snackbar.jsx";
import { SnackbarProvider } from "./context/SnackbarContext.jsx";
import About from "./screens/About/About.jsx";
import AddVocab from "./screens/AddVocab/AddVocab.jsx";
import Custom from "./screens/Custom/Custom.jsx";
import FirstStartup from "./screens/FirstStartup/FirstStartup.jsx";
import Learn from "./screens/Learn/Learn.jsx";
import Library from "./screens/Library/Library.jsx";
import Login from "./screens/Login/Login.jsx";
import Profile from "./screens/Profile/Profile.jsx";
import Progress from "./screens/Progress/Progress.jsx";
import Register from "./screens/Register/Register.jsx";
import SelectionScreen from "./screens/SelectionScreen/SelectionScreen.jsx";
import Settings from "./screens/Settings/Settings.jsx";

import { setLanguages } from "./redux/Actions/language.js";
import { signIn, signOut } from "./redux/Actions/login.js";
import { getLanguages, getProfile } from "./utils/api.js";

import Image from "./images/logo/color-round.svg";

import "./Components/sections.scss";
import "./index.scss";

const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const languages = useSelector((state) => state.language.languages);
  const user = useSelector((state) => state.login.user);

  const shouldLogin = !!user.token && !isLoggedIn;

  // Try login if token is set
  useEffect(() => {
    if (shouldLogin) {
      getProfile()
        .then((res) => {
          dispatch(
            signIn({
              username: res.data.username,
              email: user.email,
              token: user.token,
            })
          );
        })
        .catch((err) => {
          console.log(err);
          dispatch(signOut());
        });
      // when array is empty no languages were stored. Then add them to the store
      if (languages.length === 0) {
        getLanguages({ nativeNames: true }).then((res) => {
          dispatch(
            setLanguages({
              languages: res.data,
            })
          );
        });
      }
    }

    // try login only once on render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (shouldLogin) {
    return (
      <CleanLayout>
        <LoadingIndicator size="large" position="center" />
      </CleanLayout>
    );
  }

  if (!isLoggedIn) {
    return (
      <HashRouter>
        <Switch>
          <Route path="/plans" component={SelectionScreen} />
          <Route path="/login" component={() => <Login image={Image} />} />
          <Route
            path="/register"
            component={() => <Register image={Image} />}
          />
          <Route path="/">
            <Redirect to="/plans" />
          </Route>
        </Switch>
      </HashRouter>
    );
  } else {
    return (
      <HashRouter>
        <SnackbarProvider>
          <AuthenticatedLayout>
            <FirstStartup />
            <Switch>
              <Route path="/addVocab" component={AddVocab} />
              <Route path="/learn" component={Learn} />
              <Route path="/library" component={Library} />
              <Route path="/progress" component={Progress} />
              <Route path="/custom" component={Custom} />
              <Route path="/settings" component={Settings} />
              <Route path="/profile" component={Profile} />
              <Route path="/about" component={About} />
              <Route path="/">
                <Redirect to="learn" />
              </Route>
            </Switch>
            <Snackbar />
          </AuthenticatedLayout>
        </SnackbarProvider>
      </HashRouter>
    );
  }
};

export default App;
