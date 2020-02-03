import React from 'react';
import { Helmet } from 'react-helmet';
import { token$, updateToken } from './Store';
import axios from 'axios';

import Todos from './Todos'
import AddForm from './AddForm'
import { Redirect } from 'react-router-dom';
import Header from './Header.js'

const API_ROOT = "http://3.120.96.16:3002/";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todo: { content: "" }, 
            token: token$.value,
            redirect: false,
        };
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    addTodo(todo) { //  adding id på todon vi vi får i (todo)
        todo.id = Math.random();
        let todos = [...this.state.todos, todo]; //   todo här är den nya todon vi fått in
        this.setState({ todos: todos })
        this.postAxios();
    }

    deleteTodo (id) {
        console.log(id);
        const todos = this.state.todos.filter(todo => { //  Return true or false, true om vi vill behålla item ocg false om inte!
            return todo.id !== id //    Om todo id inte är = id som vi skickar in så vill vi ej deleta 
        });
        this.setState({ todos: todos }) //  If key and value have the same name you can simply write ({ todos })
    }

    getAxios() {
        axios
            .get(API_ROOT + 'todos', {
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }
            })
            .then(resp => {
                console.log(resp.data.todos);
                this.setState({ todos: resp.data.todos.todo})
            })
    }

    postAxios() {
        axios
            .post(API_ROOT + 'todos', this.state.todo, {
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }
            })
            .then(resp => {
                console.log(this.state.todo)
            })
            .catch(err => console.log(err))

    }

    onChange(e) {
        console.log(e.target.value);
        this.setState({ content: e.target.value })
    }

    onSubmit(e ) {
        e.preventDefault();
        console.log('Clicked');
        console.log(this.state);
        this.postAxios();
    }
    handleLogout() {
        console.log('Button clicked');
        updateToken(null);
        this.setState({ redirect: true })
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
                token={this.state.token}/>
                <div>
                    <h2>Todos</h2>
                </div>
                <div>
                    <AddForm addTodo={this.addTodo} />
                    <Todos todos={this.state.todos} deleteTodo={this.deleteTodo}/>
                </div>
                <div>
                    <button onClick={this.handleLogout}>Log out</button>
                    {this.state.redirect && <Redirect to='/login' />}
                </div>
            </div>
        )
    }
}

