import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export const App = () => {
    return (
        <div className="App">
            <TodoList/>
            <TodoList/>
            <TodoList/>
        </div>
    );
}

