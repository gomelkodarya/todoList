import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button, Container, Grid,
    IconButton, Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC, changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType ={
    [key: string]: Array<TaskType>
}

export const AppWithReducers = () => {
    const todoList1 = v1()
    const todoList2 = v1()

    const [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer,[
        {id: todoList1, title: 'What to learn', filter: 'all'},
        {id: todoList2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
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
        const action = removeTodoListAC(todoListId)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    const removeTask = (id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId)
        dispatchToTasksReducer(action)
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
       const action = changeTodoListFilterAC(value, todoListId)
        dispatchToTodoListsReducer(action)
    }

    const addTask = (title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatchToTasksReducer(action)
    }

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatchToTasksReducer(action)
    }

    const onChangeTodoListTitle = (value: string, todoListId: string) => {
        const action = changeTodoListTitleAC(value,todoListId)
        dispatchToTodoListsReducer(action)
    }

    const addTodoList = (title: string) => {
      const action = addTodoListAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    const onChangeTaskTitle = (id: string, value: string, todoListId: string) => {
        const action = changeTaskTitleAC(id,value, todoListId)
        dispatchToTasksReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id]

                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                            }

                            return <Grid item>
                                <Paper elevation={3} style={{padding: "10px"}}>
                                    <TodoList key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              tasks={tasksForTodoList}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeStatus={changeStatus}
                                              filter={tl.filter}
                                              removeTodoList={removeTodoList}
                                              onChangeTaskTitle={onChangeTaskTitle}
                                              onChangeTodoListTitle={onChangeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

