import { React, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import accountPage from './components/pages/accountPage';
import informationPage from './components/pages/informationPage';
import landingPage from './components/pages/landingPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <landingPage />
          </Route>
          <Route path="/info">
            <informationPage />
          </Route>
          <Route path="/account">
            <accountPage />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
