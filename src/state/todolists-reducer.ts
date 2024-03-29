import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

type ActionsType = RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType

export const todoList1 = v1()
export const todoList2 = v1()

const initialState: Array<TodoListType> = [
    // {id: todoList1, title: 'What to learn', filter: 'all'},
    // {id: todoList2, title: 'What to buy', filter: 'all'},
]

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(s => s.id !== action.id)
        case 'ADD-TODOLIST':
            return [
                {id: action.todoListId, title: action.title, filter: 'all'},
                ...state,
            ]
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(tl => tl.id === action.id)
            if(todoList) {
                todoList.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let todolist = state.find(tl => tl.id === action.id)
            if(todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        default:
            return state
    }
}

export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: title, todoListId: v1()}
}

export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todoListId}
}

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todoListId}
}