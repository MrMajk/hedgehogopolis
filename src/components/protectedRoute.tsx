import {useSelector} from "react-redux"
import React from "react"
import {useCheckTokenQuery} from "../store/api/authApiSlice"
import {Navigate} from "react-router-dom"
import Cookies from "js-cookie";
import {StoreInterface} from "../types/store";

const ProtectedRoute = ({outlet}: any) => {
    let user = useSelector((state: StoreInterface) => state.auth.user)
    let isTokenValidated = useSelector((state: StoreInterface) => state.auth.isTokenValidated)
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
