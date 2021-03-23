import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, HashRouter, Redirect } from "react-router-dom";

import AddVocab from "screens/AddVocab/AddVocab.jsx";
import SelectionScreen from "screens/SelectionScreen/SelectionScreen.jsx";
import Login from "screens/Login/Login.jsx";
import Register from "screens/Register/Register.jsx";
import FirstStartup from "screens/FirstStartup/FirstStartup.jsx";
import AuthenticatedLayout from "Components/Layout/AuthenticatedLayout/AuthenticatedLayout.jsx";

import { getProfile } from "utils/api.js";
import { signIn, signOut } from "redux/Actions/login.js";

import Image from "images/vocascan-logo.png";
import "Components/sections.scss";
import "index.scss";

const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
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
    }
  });

  if (!isLoggedIn) {
    return (
      <HashRouter>
        <Route path="/">
          <Redirect to="/plans" />
        </Route>
        <Route path="/plans" component={SelectionScreen} />
        <Route path="/login" component={() => <Login image={Image} />} />
        <Route path="/register" component={() => <Register image={Image} />} />
      </HashRouter>
    );
  } else {
    return (
      <HashRouter>
        <AuthenticatedLayout>
          <FirstStartup />
          <Route path="/addVocab" component={AddVocab} />
        </AuthenticatedLayout>
      </HashRouter>
    );
  }
};

export default App;
