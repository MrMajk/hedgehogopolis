import {useDispatch, useSelector} from "react-redux";
import React from "react"
import {useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import {useLoginMutation} from "./store/api/authApiSlice";

const Users = () => {
    const [cookies, setCookie] = useCookies(['access_token']);

    const [login] = useLoginMutation()
    const dispatch2 = useDispatch()
    const navigate = useNavigate()
    const sele = useSelector((state:any) => state.auth.isAuthenticated)

    console.log(cookies)

    const handleClick = () => {
        login({email: 'test2@test.pl', password: 'test1'}).then((response) => {
           console.log('Resp: ,', response)
            // navigate('/', { replace: true })
        })
        // const response = dispatch(login(
        //     // @ts-ignore
        //     {email: 'test2@test.pl', password: 'test1'}
        // ))
        // console.log(response)
    }

    return (
        <button type="button" onClick={handleClick}>
            Click!
        </button>
    )
}

export default Users
