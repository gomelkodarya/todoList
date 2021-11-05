import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    id: string
    addTask: (title: string, todoListId: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
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

    return (
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
    )
}