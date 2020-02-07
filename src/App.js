import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';


import { token$ } from './components/Store';
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
  height: 600px;
  border: 2px #FDDE2B;
  border-style: dashed;
  border-width: 0 0px 8px 8px;
  text-align: center;
`;
//<---Styling ends--->

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: token$.value,
    };
  }

  componentDidMount() {
    this.subscription = token$.subscribe(token => {
        this.setState({ token });
    });
}
componentWillUnmount() {
    this.subscription.unsubscribe();
}

  render() {
    return (
      <DivContainer >
        <DivApp>
          <Router>
            <Route path="/register" component={Register} />
            <Route exact path="/" render={(props) => {  //  render är funktion som vi skapar och skickar med props.
              if (this.state.token) {
                return <TodoPage {...props} />; 
              } else {
                return <Login {...props} />
              }
            }} />
          </Router>
        </DivApp>
      </DivContainer>
    );
  }
}

export default App;
