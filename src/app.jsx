import React, { useState } from 'react';
import { Route, HashRouter, Redirect } from "react-router-dom";
import './Components/sections.scss';
import { useSelector } from 'react-redux';
import Image from './images/vocascan-logo.png';
import { ThemeProvider } from '@material-ui/styles';
import theme from './colors.js';
import { makeStyles } from '@material-ui/core/styles';
import './index.scss'



import Nav from './Components/Nav/Nav.jsx';
import AddVocab from './Components/AddVocab/AddVocab.jsx';
import SelectionScreen from './Components/Authorisation/SelectionScreen/SelectionScreen.jsx';
import Login from './Components/Authorisation/Login/Login.jsx';
import Register from './Components/Authorisation/Register/Register.jsx';
import FirstStartup from './Components/Popups/FirstStartup.jsx';
import TopNav from './Components/Nav/TopNav.jsx';




const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: 0,
    padding: 0,
  },
})


function App() {

  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const classes = useStyles();

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
      <HashRouter>
          <Route path="/">
            <Redirect to="/plans"/>
          </Route>
        <Route path="/plans" component={SelectionScreen } />
        <Route path="/login" component={() => <Login image={Image} />} />
        <Route path="/register" component={() => <Register image={Image} />} />
      </HashRouter>
      </ThemeProvider>
      
    );
  }
  else {
    return (
      <ThemeProvider theme={theme}>
        <HashRouter>
          <div className="root">
            <Nav />
            <TopNav />
            <FirstStartup />
            <Route path="/addVocab" component={AddVocab} />
          </div>
        </HashRouter>
      </ThemeProvider>);
  }
  
}

export default App;