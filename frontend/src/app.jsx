import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";

import Nav from './Components/Nav/Nav';
import AddVocab from './Components/AddVocab/AddVocab';

export default class App extends React.Component {
  render() {
    return (<div>
      <BrowserRouter>
        <div className="root">
          <Nav />
          <Route path="/addVocab" component={AddVocab} />
        </div>
      </BrowserRouter>
    </div>);
  }
}
