import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, totoListId:string) => void
    changeFilter: (value: FilterValuesType, totoListId:string) => void
    addTask: (title: string, totoListId:string) => void
    changeStatus: (id: string, isDone: boolean, totoListId:string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    onChangeTaskTitle: (id: string, value: string, todoListId: string) => void
    onChangeTodoListTitle: (value: string, todoListId: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    console.log("Todolist called")
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed',props.id)
    }, [props.changeFilter, props.id])

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }

    const onChangeTodoListTitle = useCallback((value: string) => {
        props.onChangeTodoListTitle(value, props.id)
    }, [props.onChangeTodoListTitle, props.id])

    let tasksForTodoList = props.tasks

    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTodoListTitle} />
                <IconButton onClick={removeTodoListHandler}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <div>
                {
                    props.tasks.map(t => <Task task={t}
                                               id={props.id}
                                               onChangeTaskTitle={props.onChangeTaskTitle}
                                               removeTask={props.removeTask}
                                               changeStatus={props.changeStatus}
                                               key={t.id}
                        />
                    )
                }
            </div>
            <div>
                <Button color={"primary"} variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>Active</Button>
                <Button color={"primary"} variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})

