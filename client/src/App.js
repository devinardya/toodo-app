import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Board from './todo/Board';
import Home from './Home/Home';
import Login from './Login/Login';
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <Route path="/board" component={Board} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
      </Router>
    </div>
  );
}

export default App;
