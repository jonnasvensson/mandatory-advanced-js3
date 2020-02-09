import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header'
import Form from './Form'

//<---Styling--->
const P = styled.p`
    height: 50px;
`;

const Bottomdiv = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    bottom: 10px;
`;
//<---Styling ending--->


const API_ROOT = "http://3.120.96.16:3002/";


export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
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
            this.setState({ redirect: true })
        })
        .catch(err => {
            let errorMessage = err.response;
            console.log(errorMessage);
            this.setState({ error: true })
        })
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleAxios();
    }

    render() {        
        let error;
        if (this.state.error) {
            error = <P style={{ color: "red" }}>Something went wrong, pls try again!<br/>
                                                This email might already exist?<br/>
                                                </P>
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
                </div>
                {error}
                <Bottomdiv>
                    <p onClick={this.handleClick}>Already have an account <Link to='/'>click here</Link></p>
                </Bottomdiv>
                {this.state.redirect && <Redirect to='/' />}
            </div>
        )
    }
}


