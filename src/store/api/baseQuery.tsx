import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js-cookie";

export default fetchBaseQuery({
    baseUrl: 'http://localhost:8082',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = Cookies.get('access_token')
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})
