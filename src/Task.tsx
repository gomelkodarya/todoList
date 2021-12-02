import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    removeTask: (id: string, totoListId: string) => void
    changeStatus: (id: string, isDone: boolean, totoListId: string) => void
    onChangeTaskTitle: (id: string, value: string, todoListId: string) => void
    task: TaskType
    id: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveClickHandler = () => {
        props.removeTask(props.task.id, props.id)
    }

    const onCheckedChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.id)
    }

    const onChangeTitleHandler = useCallback((value: string) => {
        props.onChangeTaskTitle(props.task.id, value, props.id)
    }, [props.onChangeTaskTitle, props.task.id, props.id])

    return <div key={props.task.id}
                className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            color={"primary"}
            checked={props.task.isDone}
            onChange={onCheckedChangeHandler}
        />
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>

        <IconButton onClick={onRemoveClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})