import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import StartPage from './components/StartPage'
import Login from './components/Login'
import Register from './components/Register'
import TodoPage from './components/TodoPage'

//<---Styling--->
const DivContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DivApp = styled.div`
  margin-top: 20px;
  width: 400px;
  height: 500px;
  border: 2px #FDDE2B;
  border-style: dashed;
  border-width: 0 0px 8px 8px;
  text-align: center;
`;
//<---Styling ends--->

class App extends React.Component {
  render() {
    return (
      <DivContainer >
        <DivApp>
          <Router>
            <Route path="/startpage" component={StartPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/" component={TodoPage} />
          </Router>
        </DivApp>
      </DivContainer>
    );
  }
}

export default App;
