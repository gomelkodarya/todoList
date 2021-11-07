import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

export const TodoList = (props: PropsType) => {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed',props.id)
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }

    const onChangeTodoListTitle = (value: string) => {
        props.onChangeTodoListTitle(value, props.id)
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
                    props.tasks.map(t => {
                        const onRemoveClickHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onCheckedChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        const onChangeTitleHandler = (value: string) => {
                            props.onChangeTaskTitle(t.id, value, props.id)
                        }

                        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox
                                color={"primary"}
                                checked={t.isDone}
                                onChange={onCheckedChangeHandler}
                            />
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler}/>

                            <IconButton onClick={onRemoveClickHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    } )
                }
            </div>
            <div>
                <Button color={"primary"} variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>Active</Button>
                <Button color={"primary"} variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}