import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mode: 'light'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeMode: (state, {payload}) => {
            state.mode = payload
        }
    }
})
export const {setThemeMode} = themeSlice.actions
export default themeSlice.reducer
