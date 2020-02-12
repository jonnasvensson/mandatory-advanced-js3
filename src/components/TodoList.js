import React, { useState } from 'react';
import styled from 'styled-components';
import { Transition, TransitionGroup } from 'react-transition-group';


//<---Styling--->
const UlContainer = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    
`;
const Ul = styled.ul`
    width: 600px;
    height: 100px;
    list-style: none;
    padding: 0px;
    display: flex;
    flex-wrap: wrap;
    margin: 0px;
`;
const Li = styled.li`
    font-family: 'Patrick Hand', cursive;
    max-width: 80px;
    margin-right: 40px;
    transition: 0.5s ease-out;
    transform: translateX(
        ${({ state })=> (state === "entering" || state === "entered" ? 0 : 40)}px);
    opacity: 
        ${({ state })=> state === "entering" || state === "entered" ? "1" : "0.1"};
    `;
    
const ButtonDelete = styled.button`
    width: 80px;
    height: 30px;
    border-radius: 8px;
    margin: 2px;
    background-color: #E3B427;
    border-style: double;
    font-family: 'Patrick Hand', cursive;
    :hover {
        cursor: pointer;
    }
`;
//<---Styling ending--->


export default function TodoList(props) {    

    const todoList = props.todoList.map(todo => {
        return (
                    <Transition key={todo.id} timeout={400}>
                            {state => (
                        <Li state={state}>
                            {todo.content.charAt(0).toUpperCase() + todo.content.slice(1)}
                            <ButtonDelete onClick={() => props.deleteAxios(todo.id)}>Delete</ButtonDelete>
                        </Li>
                        )}
                    </Transition>
                );
    });
    return (
        <div>
            <UlContainer className="ulContainer">
                <Ul>
                    <TransitionGroup
                    component={null}>
                    {todoList}</TransitionGroup>
                </Ul>
            </UlContainer>
        </div>
    )
}


