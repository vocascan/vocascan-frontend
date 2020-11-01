import React, { useState } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './index.css';
import './Components/sections.css';



import Nav from './Components/Nav/Nav.jsx';
import AddVocab from './Components/AddVocab/AddVocab.jsx';
import StartPopup from './Components/Popups/StartPopup.jsx';

function App() {

  var vocascan = require('bindings')('vocascan.node');
  const [popupOpen, setPopupOpen] = useState(vocascan.checkTableEmpty("language_package"));

  function togglePopup() {
    setPopupOpen(false)
  }

  return (
    <div>
      {popupOpen ?
        <StartPopup
          text='Close Me'
          closePopup={togglePopup}
        /> : null}

      <BrowserRouter>
        <div className="root">
          <Nav />
          <Route path="/addVocab" component={AddVocab} />
        </div>
      </BrowserRouter>
    </div>);
}

export default App;