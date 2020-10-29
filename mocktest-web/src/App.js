import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TestScreen from './screens/TestScreen';
import LandingScreen from './screens/LandingScreen';
import ResultScreen from './screens/ResultScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="appHeader">
          Mock Test
        </div>
        <Route path="/" exact component={LandingScreen} />
        <Route path="/mockTest" exact component={TestScreen} />
        <Route path="/result" exact component={ResultScreen} />
      </div>
    </Router>
  );
}

export default App;
