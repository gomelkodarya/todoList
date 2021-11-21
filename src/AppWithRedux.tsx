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
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType ={
    [key: string]: Array<TaskType>
}

export const AppWithRedux = () => {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksStateType>(state =>state.tasks)

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatch(action)
    }

    const removeTask = (id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
       const action = changeTodoListFilterAC(value, todoListId)
       dispatch(action)
    }

    const addTask = (title: string, todoListId: string) => {
        const action = addTaskAC(title, todoListId)
        dispatch(action)
    }

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(id, isDone, todoListId)
        dispatch(action)
    }

    const onChangeTodoListTitle = (value: string, todoListId: string) => {
        const action = changeTodoListTitleAC(value,todoListId)
        dispatch(action)
    }

    const addTodoList = (title: string) => {
      const action = addTodoListAC(title)
        dispatch(action)
    }

    const onChangeTaskTitle = (id: string, value: string, todoListId: string) => {
        const action = changeTaskTitleAC(id,value, todoListId)
        dispatch(action)
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

