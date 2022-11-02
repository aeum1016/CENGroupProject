import { React, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import AccountPage from './components/pages/AccountPage';
import InformationPage from './components/pages/InformationPage';
import LandingPage from './components/pages/LandingPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <LandingPage />
          </Route>
          <Route path="/info">
            <InformationPage />
          </Route>
          <Route path="/account">
            <AccountPage />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
