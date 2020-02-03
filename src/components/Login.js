import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { token$, updateToken } from './Store';
import { Redirect } from 'react-router-dom';

import Form from './Form'

const API_ROOT = "http://3.120.96.16:3002/";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            token: token$.value,
            error: false

        }
        this.getAxios = this.getAxios.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.subscription = token$.subscribe(token => {
            this.setState({ token });
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    getAxios() {
        axios.post(API_ROOT + 'auth', {
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                console.log(response.data);
                updateToken(response.data.token);
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: true })
            })
    }

    handleChange(e) {
        console.log(e.target.value)
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.getAxios();
        console.log('Button clicked');
    }

    render() {
        return (
            <div>
                <div>
                    <Helmet>
                        <title>Log in</title>
                    </Helmet>
                </div>
                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    email={this.state.email}
                    submitButtonText="Log in"
                />
                {this.state.token && <Redirect to='/' />}
                {!this.state.error && <p>Invalid login, pls try again!</p>}
            </div>
        )
    }
}





/*  styling!
const InputButton = styled.input`
    width: 100px;
    background-color: pink;
    :hover {
        background-color: rebeccapurple;
    }
`; */