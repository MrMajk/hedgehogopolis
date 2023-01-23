import React, {useState} from "react";
import {TextField} from "@mui/material";
interface InputProps {
    label: string,
    type: string,
    name: string,
    errorMessage: string,
    onChangeInput: (param: any) => void,
    isValid: boolean,
    value: string
}

const Input = (props: InputProps) => {
    const [isTouching, setIsTouching] = useState(false);

    const {
        label,
        type,
        name,
        errorMessage,
        onChangeInput,
        isValid,
        value
    } = props
    return (
        <React.Fragment>
            <TextField
                margin='normal'
                onChange={onChangeInput}
                onBlur={() => {
                    setIsTouching(true)
                }}
                autoComplete="off"
                name={name}
                label={label}
                type={type}
                value={value}
                helperText={isTouching && !isValid ? errorMessage : ''}
                error={isTouching && !isValid}
            />
        </React.Fragment>
    )
}

export default Input
