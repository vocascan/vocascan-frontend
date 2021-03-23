import React from "react";
import { Route, HashRouter, Redirect } from "react-router-dom";
import "./Components/sections.scss";
import { useSelector } from "react-redux";
import Image from "./images/vocascan-logo.png";
import "./index.scss";

import AddVocab from "./screens/AddVocab/AddVocab.jsx";
import SelectionScreen from "./screens/SelectionScreen/SelectionScreen.jsx";
import Login from "./screens/Login/Login.jsx";
import Register from "./screens/Register/Register.jsx";
import FirstStartup from "./screens/FirstStartup/FirstStartup.jsx";
import AuthenticatedLayout from "./Components/Layout/AuthenticatedLayout/AuthenticatedLayout.jsx";

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

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
}

export default App;
