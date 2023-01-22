import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryReAuth} from "./baseQueryReAuth";
import {baseQueryAuth} from "./baseQueryAuth";

export const apiReAuthSlice = createApi({
  baseQuery: baseQueryReAuth,
  endpoints: builder => ({})
})

export const apiAuthSlice = createApi({
    baseQuery: baseQueryAuth,
    endpoints: builder => ({})
})


export const apiAdminSlice = createApi({
    baseQuery: baseQueryAuth,
    endpoints: builder => ({})
})
