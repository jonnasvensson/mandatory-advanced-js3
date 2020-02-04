import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { token$, updateToken } from './Store';
import { Link } from 'react-router-dom';

import Header from './Header'
import Form from './Form'


const API_ROOT = "http://3.120.96.16:3002/";


export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
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
        console.log('Button clicked');
        this.handleAxios();
    }

    render() {
        let error;
        if (this.state.error) {
            error = <p style={{ color: "red" }}>Somethins went wrong, pls try again</p>
        }
        return (
            <div>
                <div>
                    <Helmet>
                        <title>Register</title>
                    </Helmet>
                </div>
                <Header 
                headerText="Todo"/>
                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    submitButtonText="Register"
                />
                <div>
                    <p>Already have an account <Link to='/login'>click here</Link></p>
                </div>
                {error}
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
