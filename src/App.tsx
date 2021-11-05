import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType ={
    [key: string]: Array<TaskType>
}

export const App = () => {
    const todoList1 = v1()
    const todoList2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoList1, title: 'What to learn', filter: 'active'},
        {id: todoList2, title: 'What to buy', filter: 'completed'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoList1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todoList2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Apples', isDone: true},
            {id: v1(), title: 'Tea', isDone: false},
        ]
    })

    const removeTodoList = (todoListId: string) => {
        let newTodoLists = todoLists.filter(tl => tl.id !==todoListId)
        setTodoLists(newTodoLists)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const removeTask = (id: string, todoListId: string) => {
        // tasks[todoListId] = tasks[todoListId].filter(t => t.id !== id)
        // setTasks({...tasks})
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
    }
    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todolist = todoLists.find(tl => tl.id === todoListId)
        if(todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    const addTask = (title: string, todoListId: string) => {
        // let newTask = {id: v1(), title: title, isDone: false}
        // tasks[todoListId] = [newTask, ...tasks[todoListId]]
        // setTasks({...tasks})
        setTasks({...tasks, [todoListId]: [{id: v1(), title: title, isDone: false}, ...tasks[todoListId]]})
    }

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        // let task = tasks[todoListId].find(t => t.id === id)
        // if(task) {
        //     task.isDone = isDone
        //     tasks[todoListId] = [task, ...tasks[todoListId]]
        //     setTasks({...tasks})
        // }
        setTasks({...tasks,[todoListId]: tasks[todoListId].map(m => m.id === id ? {...m,isDone: isDone} : m)})
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id]

                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                    }

                    return <TodoList key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodoList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeStatus={changeStatus}
                                     filter={tl.filter}
                                     removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

