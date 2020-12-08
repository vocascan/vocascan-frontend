import React, { useState } from 'react';
import { Route, HashRouter, Redirect } from "react-router-dom";
import './Components/sections.scss';
import { useSelector } from 'react-redux';
import Image from './images/vocascan-logo.png';



import Nav from './Components/Nav/Nav.jsx';
import AddVocab from './Components/AddVocab/AddVocab.jsx';
import SelectionScreen from './Components/Authorisation/SelectionScreen/SelectionScreen.jsx';
import Login from './Components/Authorisation/Login/Login.jsx';
import Register from './Components/Authorisation/Register/Register.jsx';


function App() {

  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <HashRouter>
          <Route path="/">
            <Redirect to="/plans"/>
          </Route>
        <Route path="/plans" component={SelectionScreen } />
        <Route path="/login" component={() => <Login image={Image} />} />
        <Route path="/register" component={() => <Register image={Image} />} />
      </HashRouter>
      
    );
  }
  else {
    return (
      <HashRouter>
        <div className="root">
          <Nav />
          <Route path="/addVocab" component={AddVocab} />
        </div>
      </HashRouter>);
  }
  
}

export default App;