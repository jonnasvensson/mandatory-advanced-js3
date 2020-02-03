import React from 'react';
import './App.css';
import styles from './style.module.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Login from './components/Login.js'
import Register from './components/Register.js'
import Home from './components/Home.js'
import Header from './components/Header.js'

function MyButton(props) {
  return <button {...props} className={styles.button} />
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MyButton onClick={() => console.log("HEJ")}>Click me!</MyButton>
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
