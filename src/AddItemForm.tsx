import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBoxOutlined} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm called")
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
        if(error !== null) {
            setError(null)
        }

        if(e.charCode === 13) {
            addItemHandler()
            setTitle('')
        }
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                size={"small"}
                value={title}
                onChange={onValueChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItemHandler} color={"primary"}><AddBoxOutlined/></IconButton>
        </div>
    )
})