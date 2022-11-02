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
  console.log(process.env.REACT_APP_TEST);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/info" element={<InformationPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
