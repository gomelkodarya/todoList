import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export const App = () => {
    const tasks1: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JavaScript', isDone: true},
    ]

    const tasks2: Array<TaskType> = [
        {id: 1, title: 'Milk', isDone: true},
        {id: 2, title: 'Apples', isDone: false},
        {id: 3, title: 'Bread', isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks1}/>
            <TodoList title={'What to buy'} tasks={tasks2}/>
        </div>
    );
}

