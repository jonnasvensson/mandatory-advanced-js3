import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { token$, updateToken } from './Store';

import Form from './Form'

const API_ROOT = "http://3.120.96.16:3002/";


export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAxios() {
        console.log(this.state.email);
        console.log(this.state.password);
        axios
        .post(API_ROOT + 'register', {
            email: this.state.email, 
            password: this.state.password,
        })
        .then((response) => {
            console.log(response.status);
        })
        .catch(err => {
            console.log(err);
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
        console.log('Button clicked');
        this.handleAxios();
    }

    render() {
        return (
            <div>
                <div>
                    <Helmet>
                        <title>Register</title>
                    </Helmet>
                </div>
                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    submitButtonText="Register"
                />
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
