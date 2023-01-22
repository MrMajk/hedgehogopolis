import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import {setUser, setTokenValidated} from "../authSlice";
import baseQuery from "./baseQuery";

// @ts-ignore
export const baseQueryReAuth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const accessToken = Cookies.get('access_token')
    let response = null
    if (accessToken) {
        response = await baseQuery(args, api, extraOptions)
        if (response.data) {
            // @ts-ignore
            console.log('AccessToken SUCCESS:', response.data.userId)
            const {data} = await baseQuery({
                // @ts-ignore
                url: `/user/${response.data.userId}`
            }, api, extraOptions)
            console.log('USER', data)
            if (data) {
                api.dispatch(setUser(data))
                api.dispatch(setTokenValidated(true))
                return response
            }
        }
    }

    const refreshToken = Cookies.get('refresh_token')
    console.log('ARGS', args)
    if ((!response || response?.error?.status === 401) && refreshToken) {
        console.log('sending refresh token....')
        await baseQuery({
            url: '/revoke-token',
            body: {
                refresh_token: refreshToken
            },
            method: 'POST'
        }, api, extraOptions)
        // if (refreshResponse.data) {
        //     response = await baseQuery(args, api, extraOptions)
        // }
    } else {
        api.dispatch(setTokenValidated(true))
    }
    return response;
}
