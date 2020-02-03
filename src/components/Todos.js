import React from 'react';

export default function Todos({ todos, deleteTodo }) {
        const todoList = todos.map(todo => {
            return (
                <div key={todo.id}>
                    <span>{todo.content}</span>
                    <button onClick={() => {deleteTodo(todo.id)}}>Delete</button>
                </div>
            )
        })
    return (
        <div className="todos collection">
            {todoList}
        </div>
    )
}