import {useSelector} from "react-redux"
import React from "react"
import {useCheckTokenQuery} from "../store/api/authApiSlice"
import {Navigate} from "react-router-dom"
import Cookies from "js-cookie";

const ProtectedRoute = ({outlet}: any) => {
    let user = useSelector((state: any) => state.auth.user)
    let isTokenValidated = useSelector((state: any) => state.auth.isTokenValidated)
    const token = Cookies.get('access_token')
        useCheckTokenQuery(token, {
            refetchOnMountOrArgChange: false,
            skip: false,
        })
    return (
        <div>
            {!isTokenValidated && <div></div>}
            {isTokenValidated && user && outlet}
            {isTokenValidated && !user && <Navigate to={{pathname: '/auth'}}/>}
        </div>
    )
}

export default ProtectedRoute
