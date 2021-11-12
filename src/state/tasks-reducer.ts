import {TasksStateType} from "../App";
import {v1} from "uuid";
import {
    AddTodoListActionType, RemoveTodoListActionType,
} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    id: string,
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS',
    id: string
    isDone: boolean,
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE',
    id: string
    title: string,
    todoListId: string
}

type ActionsType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodoListActionType |
    RemoveTodoListActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.id)
            }

        case'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]
            }

        case "CHANGE-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.id ? {...task, isDone: action.isDone} : task)
            }

        case "CHANGE-TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.id ? {...task, title: action.title} : task)
            }

        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListId]: []
            }

        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.id]
            return newState

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (id: string, todoListId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', id, todoListId}
}

export const addTaskAC = ( title: string, todoListId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todoListId}
}

export const changeTaskStatusAC = ( id: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-STATUS', id, isDone, todoListId}
}

export const changeTaskTitleAC = ( id: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TITLE', id, title, todoListId}
}

