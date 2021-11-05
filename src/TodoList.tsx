import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import './App.css'

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
}

export const TodoList = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if(title.trim() !== ''){
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError('Field is required')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.charCode === 13) {
            addTaskHandler()
            setTitle('')
        }
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

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoListHandler}>x</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onValueChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveClickHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onCheckedChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onCheckedChangeHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveClickHandler}>x</button>
                        </li>
                    } )
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}