import React from 'react';

export default function Form(props) {
        return (
            <form onSubmit={props.handleSubmit}>
                <input
                    type="email"
                    name="email"
                    required
                    min="1"
                    value={props.email} 
                    onChange={props.handleChange}
                />
                <input
                    type="password"
                    name="password"
                    required
                    min="1"
                    value={props.password} 
                    onChange={props.handleChange}
                />
                <input
                    type="submit"
                    value={props.submitButtonText} />
            </form>
        )
}

