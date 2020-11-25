import React, { useState } from 'react';
import { Route, HashRouter } from "react-router-dom";
import './Components/sections.scss';



import Nav from './Components/Nav/Nav.jsx';
import AddVocab from './Components/AddVocab/AddVocab.jsx';
import StartPopup from './Components/Popups/StartPopup.jsx';


function App() {

  
  const [popupOpen, setPopupOpen] = useState(true);

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

      <HashRouter>
        <div className="root">
          <Nav />
          <Route path="/addVocab" component={AddVocab} />
        </div>
      </HashRouter>
    </div>);
}

export default App;