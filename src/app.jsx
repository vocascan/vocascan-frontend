import React, { useState } from 'react';
import { Route, HashRouter } from "react-router-dom";
import './Components/sections.scss';
import { useSelector } from 'react-redux';



import Nav from './Components/Nav/Nav.jsx';
import AddVocab from './Components/AddVocab/AddVocab.jsx';
import SelectionScreen from './Components/Authorisation/SelectionScreen.jsx';


function App() {

  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const [popupOpen, setPopupOpen] = useState(true);

  function togglePopup() {
    setPopupOpen(false)
  }

  if (!isLoggedIn) {
    return (
      <SelectionScreen />
    );
  }
  else {
    return (
    <div>
      <HashRouter>
        <div className="root">
          <Nav />
          <Route path="/addVocab" component={AddVocab} />
        </div>
      </HashRouter>
    </div>);
  }
  
}

export default App;