import React from 'react';
import styled from 'styled-components';
import Header from './Header'


//<---Styling--->
const InputField = styled.input`
    width: 200px;
    height: 30px;
    border-radius: 8px;
    margin: 10px;
    border-style: double;
    border-color: #E3B427;
    font-family: 'Shadows Into Light', cursive;
    text-align: center;
    ::placeholder{ color: black }
`;

const InputFieldButton = styled.input`
    width: 300px;
    height: 50px;
    border-radius: 8px;
    margin: 20px;
    background-color: #E3B427;
    border-style: double;
    font-family: 'Shadows Into Light', cursive;
        :hover {
        cursor: pointer;
    }
`;
//<---Styling ending--->

export default function Form(props) {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <InputField
                        placeholder="Email"
                        type="email"
                        name="email"
                        required
                        min="1"
                        value={props.email}
                        onChange={props.handleChange}
                    />
                </div>
                <div>
                    <InputField
                        placeholder="Password"
                        type="password"
                        name="password"
                        required
                        min="1"
                        value={props.password}
                        onChange={props.handleChange}
                    />
                </div>
                <InputFieldButton
                    type="submit"
                    value={props.submitButtonText} />
            </form>
        </>
    )
}

