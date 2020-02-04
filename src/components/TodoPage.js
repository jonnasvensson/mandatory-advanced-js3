import React from 'react';
import { Helmet } from 'react-helmet';
import { token$, updateToken } from './Store';
import axios from 'axios';
import styled from 'styled-components';

import { Redirect } from 'react-router-dom';
import Header from './Header.js'
import TodoList from './TodoList.js'


const API_ROOT = "http://3.120.96.16:3002/";

//<---Styling--->
const Inputfield = styled.input`
    width: 200px;
    height: 30px;
    border-radius: 8px;
    margin: 20px;
    border-style: double;
    border-color: #E3B427;
    font-family: 'Patrick Hand', cursive;
    text-align: center;
    ::placeholder{ color: black }
`;
const Button = styled.button`
    width: 300px;
    height: 50px;
    border-radius: 8px;
    margin: 20px;
    background-color: #E3B427;
    border-style: double;
    font-family: 'Patrick Hand', cursive;
    :hover {
        cursor: pointer;
    }
`; 
const ButtonAdd = styled.button`
    width: 100px;
    height: 30px;
    border-radius: 8px;
    margin: 20px;
    background-color: #E3B427;
    border-style: double;
    font-family: 'Patrick Hand', cursive;
    :hover {
        cursor: pointer;
    }
`; 
//<---Styling ending--->

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            content: "",
            token: token$.value,
            redirect: false,
        };
        this.deleteAxios = this.deleteAxios.bind(this);
        this.getAxios = this.getAxios.bind(this);
        this.postAxios = this.postAxios.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.subscription = token$.subscribe(token => {
            this.setState({ token });
        });
        this.getAxios()
    }
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    deleteAxios(id) {
        axios
            .delete(API_ROOT + 'todos/' + id, {
                headers: { Authorization: `Bearer ${this.state.token}` }
            })
            .then(resp => {
                console.log(resp.status);
                this.getAxios();
            })
            .catch(err => {
                console.log(err);
            })
    }
    getAxios() {
        axios
            .get(API_ROOT + 'todos/', {
                headers: { Authorization: `Bearer ${this.state.token}` }
            })
            .then(resp => {
                this.setState({ todoList: resp.data.todos });
            })
            .catch(err => {
                console.log("err", err);
                updateToken(null);
            });
    }
    postAxios() {
        let todo = { content: this.state.content };
        axios
            .post(API_ROOT + 'todos/', todo, {
                headers: { Authorization: `Bearer ${this.state.token}` }
            })
            .then(resp => {
                console.log(resp.data.todo);
                this.getAxios();
            })
            .catch(err => 
                console.log(err))
    }

    handleChange(e) {
        console.log(e.target.value);
        this.setState({ content: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.postAxios();
        this.setState({ content: ""})
    }
    handleLogout() {
        updateToken(null);
        this.setState({ redirect: true });
    }

    render() {
        return (
            <div>
                <div>
                    <Helmet>
                        <title>Home</title>
                    </Helmet>
                </div>
                <Header 
                    headerText="Todos "
                    token={this.state.token} />
                <form onSubmit={this.handleSubmit}>
                    <Inputfield
                        value={this.state.content}
                        type="text"
                        onChange={this.handleChange} />
                    <ButtonAdd type="submit">Add todo</ButtonAdd>
                </form>
                <TodoList
                    todoList={this.state.todoList} 
                    deleteAxios={this.deleteAxios}/>
                <div>
                    <Button onClick={this.handleLogout}>Log out</Button>
                    {this.state.redirect && <Redirect to='/login' />}
                </div>
            </div>
        )
    }
}



