import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {setUser} from "../authSlice";
import baseQuery from "./baseQuery";


export const baseQueryAuth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let response = await baseQuery(args, api, extraOptions)
    // console.log(response)
    // // @ts-ignore
    // if (response?.data) {
    //     const {data} = await baseQuery({
    //         url: `/user/1`
    //     }, api, extraOptions)
    //     console.log('USER', data)
    //     if (data) {
    //         api.dispatch(setUser(data))
    //         return response
    //     }
    // }
    return response
}
