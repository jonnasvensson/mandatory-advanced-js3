import React from 'react';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';

const H2inHeader = styled.h1`
    font-family: 'Zhi Mang Xing', cursive;
    font-size: 80px;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #FAB436;
`;

const PinHeader = styled.p`
    font-family: 'Caveat', cursive;
    font-size: 30px;
`;

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            decodedEmail: "",
        }
    }

    componentDidMount() {
        if (this.props.token) {
            let decoded = jwt.decode(this.props.token);
            console.log(decoded);
            this.setState({
                decodedEmail: decoded.email,
            })
        }
    }

    render() {
        return (
            <div>
                <H2inHeader>{this.props.headerText}</H2inHeader>
                <PinHeader>{this.state.decodedEmail}</PinHeader>
            </div >
        )
    }
}

