import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Header from './components/Header'



class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </div>
    );
  }
}

export default App;
