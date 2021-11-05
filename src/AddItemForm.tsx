import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        if(title.trim() !== ''){
            props.addItem(title)
            setTitle('')
        } else {
            setError('Field is required')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(e.charCode === 13) {
            addItemHandler()
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
            <button onClick={addItemHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}