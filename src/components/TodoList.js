import React from 'react';
import styled from 'styled-components';

//<---Styling--->
const UlContainer = styled.div`
    width: 400px;
    height: 150px;
    overflow-x: auto;
`;
const Ul = styled.ul`
    list-style: none;
    padding: 0px;
`;
const Li = styled.li`
    font-family: 'Patrick Hand', cursive;`;
const ButtonDelete = styled.button`
    width: 100px;
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
        return <Li key={todo.id}>{todo.content.charAt(0).toUpperCase() + todo.content.slice(1)}
            <ButtonDelete onClick={() => props.deleteAxios(todo.id)}>Delete</ButtonDelete>
        </Li>
    })
    return (
        <div>
            <UlContainer>
                <Ul>
                    {todoList}
                </Ul>
            </UlContainer>
        </div>
    )
}

