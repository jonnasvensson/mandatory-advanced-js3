import React from 'react';
import jwt from 'jsonwebtoken';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            decodedEmail: "",
        }
    }

    componentDidMount() {
        console.log(this.props.token);
        if (this.props.token) {
            let decoded = jwt.decode(this.props.token);
            console.log(decoded);
            this.setState({
                decodedEmail: decoded.email,
                tokenTime: decoded.iat - decoded.exp,
            })
        }
    }

    render() {
        return (
            <div>
                <h2>Hello labb 3</h2>
                <p>{this.state.decodedEmail}</p>
            </div >
        )
    }
}

