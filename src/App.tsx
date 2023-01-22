import React from 'react';
import {useSelector} from "react-redux";
import {createTheme, ThemeProvider} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import Notification from "./uiComponents/notification";

function App() {
    const themeMode = useSelector((state: any) => state.theme.mode)

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode
                }

            }),
        [themeMode],
    )

    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
            <Notification/>
        </ThemeProvider>
    );
}

export default App;
