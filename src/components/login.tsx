import React from 'react'
import {useLoginMutation} from "../store/api/authApiSlice";
import {useNavigate} from "react-router-dom";
import useNotification from "../hooks/useNotification";
import CustomForm from "../uiComponents/customForm";
import forms from "../config/forms.json"

const Login = () => {
    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const { showNotification } = useNotification()

    const onLoginHandler = (fields:any) => {

        login({email: fields.email, password: fields.password}).then((response: any) => {
            if (response?.error) {
                showNotification( 'Error!', 'error', 'Incorrect value')
            } else {
                showNotification( 'Success!', 'success', 'Success!')
                navigate('/', {replace: true})
            }
        })
    }

    return (
        <React.Fragment>
            <CustomForm
                onFormHandler={onLoginHandler}
                fieldsState={{email: '', password: ''}}
                formValidState={{email: false, password: false}}
                fieldsData={forms.forms.login}
            />
        </React.Fragment>
    )
}

export default Login
