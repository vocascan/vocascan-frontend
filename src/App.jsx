import React from "react";
import { Route, HashRouter, Redirect } from "react-router-dom";
import "./Components/sections.scss";
import { useSelector } from "react-redux";
import Image from "./images/vocascan-logo.png";
import "./index.scss";

import Nav from "./Components/Nav/Nav.jsx";
import AddVocab from "./screens/AddVocab/AddVocab.jsx";
import SelectionScreen from "./screens/SelectionScreen/SelectionScreen.jsx";
import Login from "./screens/Login/Login.jsx";
import Register from "./screens/Register/Register.jsx";
import FirstStartup from "./screens/FirstStartup/FirstStartup.jsx";
import TopNav from "./Components/Nav/TopNav.jsx";

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
        <div className="root">
          <Nav />
          <TopNav />
          <FirstStartup />
          <Route path="/addVocab" component={AddVocab} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
