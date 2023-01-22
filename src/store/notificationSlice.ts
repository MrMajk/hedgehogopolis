import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isActive: false,
    msg: '',
    type: 'warning',
    title: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, {payload}) => {
            state.isActive = payload.isActive
            state.msg = payload.msg
            state.type = payload.type
            state.title = payload.title
        }
    }
})
export const {setNotification} = notificationSlice.actions
export default notificationSlice.reducer
