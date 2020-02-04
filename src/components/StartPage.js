import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    width: 300px;
    height: 50px;
    border-radius: 8px;
    margin: 20px;
    background-color: #E3B427;
    border-style: double;
    font-family: 'Sigmar One', cursive;
    :hover {
        cursor: pointer;
    }
`; 

export default function StartPage() {
    return (
        <div>
            <Header
                headerText="Todo" />
            <div>
                <Link to='/login'><Button><p style={{ color: "black" }}>Log in</p></Button></Link>
            </div>
            <div>
                <Link to='/register'><Button>Register</Button></Link>
            </div>
        </div>
    )
}

