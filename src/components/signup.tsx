import React from 'react'
import {useSignupMutation, useLoginMutation} from "../store/api/authApiSlice";
import {useNavigate} from "react-router-dom";
import useNotification from '../hooks/useNotification'
import CustomForm from "../uiComponents/customForm";
import forms from "../config/forms.json"
import {CustomFormInterface} from "../types/customForm";

const Signup = () => {
    const [signup] = useSignupMutation()
    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const {showNotification} = useNotification()


    const onSignupHandler = (fields:CustomFormInterface) => {
        let fd = new FormData()
        for ( let key in fields ) {
            fd.append(key, fields[key]);
        }

        signup(fd).then((response: any) => {
            if (response?.error) {
                const errorMsg = response?.error?.data?.errors[0]?.msg || 'Please try again later or change creditionals'
                showNotification(errorMsg, 'error', 'Error Dude :(')
            } else {
                login({email: fields.email, password: fields.password}).then((response: any) => {
                    if (response?.error) {
                        showNotification( 'Error!', 'error', 'Wrong data')
                    } else {
                        navigate('/', {replace: true})
                    }
                })
            }
        })
    }


    return (
        <React.Fragment>
            <CustomForm
                onFormHandler={onSignupHandler}
                fieldsState={{email: '', password: '', term: false, nick: '', avatar: {}}}
                formValidState={{email: false, password: false, term: false, nick: false}}
                fieldsData={forms.forms.signup}
            />
        </React.Fragment>
    )
}

export default Signup
