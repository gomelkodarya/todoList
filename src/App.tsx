import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

export const App = () => {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JavaScript', isDone: true},
        {id: 4, title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForTodoList = tasks

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }


    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

