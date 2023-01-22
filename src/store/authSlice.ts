import {createSlice} from "@reduxjs/toolkit"
import {reAuthApiSlice, authApiSlice, } from "./api/authApiSlice"

type InitialState = {
    user: {} | null,
    users: [] | null,
    token: string | null
    isAuthenticated: boolean,
    isTokenValidated: boolean
}

const initialState: InitialState = {
    user: null,
    users: null,
    token: null,
    isAuthenticated: false,
    isTokenValidated: false
}

// export const login = createAsyncThunk(
//     'auth/login',
//     // @ts-ignore
//     async ({email, password}) => {
//         const response = await axios.post(`http://localhost:8082/login`, {email, password}, {withCredentials: true})
//         console.log(response)
//         return response
//     }
// )
//
// interface UsersState {
//     entities: []
//     loading: 'idle' | 'pending' | 'succeeded' | 'failed'
// }


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload
        },
        setCredentials: (state, action) => {
            const {user, access_token} = action.payload
            state.user = user
            state.token = access_token
        },
        logout: (state, action) => {
            state.user = null
            state.token = null
        },
        setTokenValidated: (state, {payload}) => {
            state.isTokenValidated = payload
        }

    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApiSlice.endpoints.login.matchFulfilled, (state, {payload}) => {
                state.user = payload.user
                state.isAuthenticated = true
            })
        builder.addMatcher(
            authApiSlice.endpoints.login.matchRejected, (state, {payload}) => {
                console.log(payload)
            })
        builder.addMatcher(
            reAuthApiSlice.endpoints.checkToken.matchFulfilled, (state, {payload}) => {
            })
        builder.addMatcher(
            reAuthApiSlice.endpoints.revokeToken.matchRejected, (state, {payload}) => {
                state.isTokenValidated = true
            })
        builder.addMatcher(
            authApiSlice.endpoints.getUserById.matchFulfilled, (state, {payload}) => {
                console.log('USER', payload)
                state.user = payload
            })
    }
})

export const {setUser, setTokenValidated} = authSlice.actions
export default authSlice.reducer
