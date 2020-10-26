import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TestScreen from './screens/TestScreen';
import LoginScreen from './screens/LoginScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="appHeader">
          Hello Welcome to Assignment Web
        </div>
        <Route path="/" exact component={LoginScreen} />
      </div>
    </Router>
  );
}

export default App;
