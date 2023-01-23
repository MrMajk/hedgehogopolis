import React, {ChangeEventHandler, useState} from "react"
import {FormControl, IconButton, InputAdornment, TextField} from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface InputProps {
    label: string,
    name: string,
    errorMessage: string,
    onChangeInput: (param: any) => void,
    isValid: boolean,
    value: string
}

const PasswordInput = (props: InputProps) => {
    const [isTouching, setIsTouching] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const {
        label,
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
                name={name}
                value={value}
                label={label}
                type={showPassword ? 'text' : 'password'}
                helperText={isTouching && !isValid ? errorMessage : ''}
                error={isTouching && !isValid}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                                { showPassword ? <VisibilityOffIcon/> : <VisibilityIcon />}
                            </IconButton >
                        </InputAdornment>
                    )
                }}
            />
        </React.Fragment>
    )
}

export default PasswordInput
