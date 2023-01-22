import {configureStore} from "@reduxjs/toolkit";
import {apiAuthSlice} from "./api/apiSlice";
import authSlice from "./authSlice";
import themeSlice from "./themeSlice";
import notificationSlice from "./notificationSlice";
import adminSlice from "./adminSlice";

const store = configureStore({
    reducer: {
        [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
        auth: authSlice,
        notification: notificationSlice,
        admin: adminSlice,
        theme: themeSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([apiAuthSlice.middleware]),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
