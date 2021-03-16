import React, { useState } from 'react';
import { Route, HashRouter, Redirect } from "react-router-dom";
import './Components/sections.scss';
import { useSelector } from 'react-redux';
import Image from './images/vocascan-logo.png';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import './index.scss';



import Nav from './Components/Nav/Nav.jsx';
import AddVocab from './screens/AddVocab.jsx';
import SelectionScreen from './screens/SelectionScreen.jsx';
import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import FirstStartup from './screens/FirstStartup.jsx';
import TopNav from './Components/Nav/TopNav.jsx';


function App() {

  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const classes = useStyles();

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
  }
  else {
    return (
      <HashRouter>
        <Box className={classes.root}>
          <Nav />
          <TopNav />
          <FirstStartup />
          <Route path="/addVocab" component={AddVocab} />
        </Box>
      </HashRouter>);
  }

}


const useStyles = makeStyles({
  root: {
    display: "grid",
    width: "100%",
    height: "100vh",
    gridTemplateColumns: "200px auto",
    gridTemplateRows: "40px auto",
    margin: 0,
    padding: 0,
  },
})

export default App;
