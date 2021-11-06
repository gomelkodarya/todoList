import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) =>  {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input
            value={title}
            onChange={onChangeHandler}
            onBlur={activateViewMode}
            autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}