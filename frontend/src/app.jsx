import React, { useState } from 'react';
import { Route, BrowserRouter } from "react-router-dom";

import Nav from './Components/Nav/Nav';
import AddVocab from './Components/AddVocab/AddVocab';
import StartPopup from './Components/Popups/StartPopup';

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

      <BrowserRouter>
        <div className="root">
          <Nav />
          <Route path="/addVocab" component={AddVocab} />
        </div>
      </BrowserRouter>
    </div>);
}

export default App;
