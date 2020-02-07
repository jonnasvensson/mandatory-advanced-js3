import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { token$, updateToken } from './Store';
import { Link, Redirect } from 'react-router-dom';

import Header from './Header'
import Form from './Form'


const API_ROOT = "http://3.120.96.16:3002/";


export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            register: false,
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
        if (this.state.register) {
            return <Redirect to="/login" />
        }
    }

    render() {        
        let error;
        if (this.state.error) {
            error = <p style={{ color: "red" }}>Something went wrong, pls try again!<br/>
                                                This email might already exist?<br/>
                                                </p>
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
                <p onClick={this.handleClick}>Already have an account <Link to='/'>click here</Link></p>
            </div>
        )
    }
}


